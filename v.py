"""
Pizza Jones — get_popup_toppings.php Extractor
================================================
Specifically targets:
  POST https://orderonline.pizzajones.com.au/core/ajax/get_popup_toppings.php

HOW IT WORKS
------------
1. Fetches the main page with requests (full raw HTML — includes all data-* attributes)
2. Scans every <li> element for item IDs hidden in:
     • data-item-id="..."
     • data-id="..."
     • data-menu-item-id="..."
     • onclick="showPopup(123, ...)" style JS calls
3. POSTs to get_popup_toppings.php with each item_id
4. Parses the JSON response → sizes, toppings, extras, prices
5. Saves everything to toppings_all_items.json + toppings_all_items.csv

INSTALL
-------
    pip install requests beautifulsoup4

RUN
---
    python get_popup_toppings.py
"""

import json
import csv
import re
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ─── Config ──────────────────────────────────────────────────────────────────

BASE_URL  = "https://orderonline.pizzajones.com.au"
ENDPOINT  = BASE_URL + "/core/ajax/get_popup_toppings.php"

# Exact headers the browser sends (copied from DevTools → Headers tab)
HEADERS_PAGE = {
    "User-Agent":      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept":          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-AU,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection":      "keep-alive",
    "Referer":         BASE_URL + "/",
}

HEADERS_AJAX = {
    "User-Agent":       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept":           "application/json, text/javascript, */*; q=0.01",
    "Accept-Language":  "en-AU,en;q=0.9",
    "Accept-Encoding":  "gzip, deflate, br",
    "Content-Type":     "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",   # ← key header that tells server this is AJAX
    "Origin":           BASE_URL,
    "Referer":          BASE_URL + "/",
    "Connection":       "keep-alive",
}

OUTPUT_DIR = Path("toppings_raw")
OUTPUT_DIR.mkdir(exist_ok=True)

# ─────────────────────────────────────────────────────────────────────────────
# STEP 1 — Session + main page fetch
# ─────────────────────────────────────────────────────────────────────────────

def fetch_html(session: requests.Session) -> BeautifulSoup:
    """
    Fetches the full raw HTML. This is critical — requests gets ALL attributes
    (data-item-id, data-id, onclick, etc.) that browser devtools / markdown
    renderers strip out.
    """
    print("→ Fetching main page (raw HTML)...")
    r = session.get(BASE_URL + "/", headers=HEADERS_PAGE, timeout=20)
    r.raise_for_status()

    # Save raw HTML so you can inspect it yourself
    Path("raw_page.html").write_bytes(r.content)
    print(f"  ✓ {len(r.content):,} bytes  |  cookies: {dict(session.cookies)}")

    return BeautifulSoup(r.content, "html.parser")

# ─────────────────────────────────────────────────────────────────────────────
# STEP 2 — Extract every item_id from the HTML
# ─────────────────────────────────────────────────────────────────────────────

# Patterns to find item IDs embedded in onclick / JS attributes
_ONCLICK_PATTERNS = [
    re.compile(r"showPopup\s*\(\s*['\"]?(\d+)['\"]?\s*[,)]"),
    re.compile(r"openItem\s*\(\s*['\"]?(\d+)['\"]?\s*[,)]"),
    re.compile(r"addToCart\s*\(\s*['\"]?(\d+)['\"]?\s*[,)]"),
    re.compile(r"getItem\s*\(\s*['\"]?(\d+)['\"]?\s*[,)]"),
    re.compile(r"item_id\s*=\s*['\"]?(\d+)['\"]?"),
    re.compile(r"['\"]item_id['\"]\s*:\s*['\"]?(\d+)['\"]?"),
    re.compile(r"data-item[_-]?id=['\"](\d+)['\"]"),
]

def extract_item_ids(soup: BeautifulSoup) -> list[dict]:
    """
    Scans every <li> for item IDs stored in:
      • data-item-id / data-id / data-menu-item-id  attributes
      • onclick / data-onclick  attributes
      • any nested <button> or <a> with those same attributes
    Returns list of {item_id, name, category}
    """
    results = []
    seen_ids = set()

    # All data-attribute names we try (server may use any of these)
    DATA_ATTRS = [
        "data-item-id", "data-id", "data-menu-item-id",
        "data-product-id", "data-menu-id", "data-pid",
    ]

    # Walk every category block
    for block in soup.find_all("div", id=lambda x: x and x.endswith("-block")):
        cat_el = block.find(["h1", "h2", "h3"])
        category = cat_el.get_text(strip=True) if cat_el else "Unknown"

        for li in block.find_all("li"):
            # Grab item name from first non-empty text
            texts = [t.strip() for t in li.stripped_strings if t.strip()]
            name = texts[0] if texts else ""
            if not name or len(name) < 2:
                continue

            item_id = None

            # ── Method 1: check data-* attributes on <li> itself ──
            for attr in DATA_ATTRS:
                val = li.get(attr, "")
                if val and val.isdigit():
                    item_id = int(val)
                    break

            # ── Method 2: check nested elements (<button>, <a>, <div>) ──
            if not item_id:
                for child in li.find_all(True):
                    for attr in DATA_ATTRS:
                        val = child.get(attr, "")
                        if val and val.isdigit():
                            item_id = int(val)
                            break
                    if item_id:
                        break

            # ── Method 3: scan all onclick / data-onclick / JS strings ──
            if not item_id:
                # Collect every attribute string from li and its children
                js_blobs = []
                for tag in [li] + li.find_all(True):
                    for attr_name in ["onclick", "data-onclick", "ng-click",
                                      "x-on:click", "@click"]:
                        val = tag.get(attr_name, "")
                        if val:
                            js_blobs.append(val)
                    # Also check class attributes that might embed IDs like "item-123"
                    cls = " ".join(tag.get("class", []))
                    m = re.search(r"\bitem-(\d+)\b", cls)
                    if m:
                        item_id = int(m.group(1))
                        break

                if not item_id:
                    for blob in js_blobs:
                        for pattern in _ONCLICK_PATTERNS:
                            m = pattern.search(blob)
                            if m:
                                item_id = int(m.group(1))
                                break
                        if item_id:
                            break

            # ── Method 4: scan inline <script> tags inside li ──
            if not item_id:
                for script in li.find_all("script"):
                    for pattern in _ONCLICK_PATTERNS:
                        m = pattern.search(script.string or "")
                        if m:
                            item_id = int(m.group(1))
                            break
                    if item_id:
                        break

            if item_id and item_id not in seen_ids:
                seen_ids.add(item_id)
                results.append({
                    "item_id":  item_id,
                    "name":     name,
                    "category": category,
                })

    return results


def scan_global_scripts(soup: BeautifulSoup) -> list[int]:
    """
    Fallback: scan ALL <script> tags in the page for item ID patterns.
    Useful if IDs are loaded via an inline JSON blob rather than HTML attributes.
    """
    ids = set()
    for script in soup.find_all("script"):
        src = script.string or ""
        # Look for arrays/objects containing item IDs
        for pattern in _ONCLICK_PATTERNS:
            for m in pattern.finditer(src):
                ids.add(int(m.group(1)))
        # Also look for JSON-style: {"id":123} or "item_id":456
        for m in re.finditer(r'"(?:id|item_id|menu_item_id)"\s*:\s*(\d+)', src):
            ids.add(int(m.group(1)))
    return sorted(ids)

# ─────────────────────────────────────────────────────────────────────────────
# STEP 3 — POST to get_popup_toppings.php
# ─────────────────────────────────────────────────────────────────────────────

def post_popup_toppings(session: requests.Session, item_id: int) -> dict | None:
    """
    Sends the exact POST the browser sends when a user clicks a menu item.

    Payload variations tried (server may expect any of these key names):
        item_id=123
        id=123
        menu_item_id=123
        store_id=1   (sometimes required)
        order_type=pickup / delivery
    """

    # Try the most likely payload first, then fallbacks
    payloads = [
        {"item_id": item_id},
        {"item_id": item_id, "store_id": "1"},
        {"item_id": item_id, "store_id": "1", "order_type": "pickup"},
        {"item_id": item_id, "store_id": "1", "order_type": "delivery"},
        {"id": item_id},
        {"menu_item_id": item_id},
        {"product_id": item_id},
    ]

    for payload in payloads:
        try:
            r = session.post(
                ENDPOINT,
                data=payload,
                headers=HEADERS_AJAX,
                timeout=10,
            )

            if r.status_code != 200:
                continue

            raw = r.text.strip()
            if not raw or raw in ("", "null", "false", "0"):
                continue

            # Try JSON parse
            try:
                data = r.json()
                if data:  # non-empty response
                    return {
                        "status":    r.status_code,
                        "payload":   payload,
                        "raw":       raw,
                        "parsed":    data,
                    }
            except Exception:
                # Not JSON — might be HTML fragment or plain text
                if len(raw) > 20:  # meaningful content
                    return {
                        "status":  r.status_code,
                        "payload": payload,
                        "raw":     raw,
                        "parsed":  None,
                    }

        except requests.exceptions.RequestException as e:
            print(f"      ✗ request error: {e}")
            continue

    return None

# ─────────────────────────────────────────────────────────────────────────────
# STEP 4 — Parse the toppings response
# ─────────────────────────────────────────────────────────────────────────────

def parse_toppings_response(raw_response: dict) -> dict:
    """
    Extract structured data from whatever format the API returns.
    Common formats from Deliverit platform:
      • { "sizes": [...], "toppings": [...], "extras": [...] }
      • { "data": { ... } }
      • HTML string containing <option> or <input> elements
      • Plain JSON array
    """
    result = {
        "sizes":    [],
        "toppings": [],
        "extras":   [],
        "raw_keys": [],
    }

    parsed = raw_response.get("parsed")
    raw    = raw_response.get("raw", "")

    if isinstance(parsed, dict):
        result["raw_keys"] = list(parsed.keys())

        # Direct keys
        for key in ["sizes", "size", "size_options"]:
            if key in parsed:
                result["sizes"] = parsed[key]
                break

        for key in ["toppings", "topping", "ingredients", "options"]:
            if key in parsed:
                result["toppings"] = parsed[key]
                break

        for key in ["extras", "extra", "add_ons", "addons", "modifiers"]:
            if key in parsed:
                result["extras"] = parsed[key]
                break

        # Nested under "data"
        if "data" in parsed and isinstance(parsed["data"], dict):
            d = parsed["data"]
            if not result["sizes"]    and "sizes"    in d: result["sizes"]    = d["sizes"]
            if not result["toppings"] and "toppings" in d: result["toppings"] = d["toppings"]
            if not result["extras"]   and "extras"   in d: result["extras"]   = d["extras"]

    elif isinstance(parsed, list):
        # Sometimes returns a plain list of options
        result["toppings"] = parsed

    # If raw is HTML (Deliverit sometimes returns HTML fragments)
    if not any([result["sizes"], result["toppings"], result["extras"]]) and raw:
        html_soup = BeautifulSoup(raw, "html.parser")

        # Parse <option> tags (size dropdowns)
        for opt in html_soup.find_all("option"):
            val = opt.get("value", "")
            label = opt.get_text(strip=True)
            if val and label:
                result["sizes"].append({"value": val, "label": label})

        # Parse <input type="checkbox"> or <input type="radio"> (toppings)
        for inp in html_soup.find_all("input"):
            itype = inp.get("type", "").lower()
            if itype in ("checkbox", "radio"):
                label_el = html_soup.find("label", {"for": inp.get("id", "___")})
                label = label_el.get_text(strip=True) if label_el else inp.get("value", "")
                result["toppings"].append({
                    "type":  itype,
                    "name":  label,
                    "value": inp.get("value", ""),
                    "name_attr": inp.get("name", ""),
                })

    return result

# ─────────────────────────────────────────────────────────────────────────────
# STEP 5 — Main loop: hit endpoint for every item
# ─────────────────────────────────────────────────────────────────────────────

def fetch_all_toppings(session: requests.Session, items: list[dict]) -> list[dict]:
    all_data = []
    print(f"\n→ POSTing to get_popup_toppings.php for {len(items)} items...\n")

    for i, item in enumerate(items, 1):
        item_id  = item["item_id"]
        name     = item["name"]
        category = item["category"]

        print(f"  [{i:02d}/{len(items):02d}] item_id={item_id:5d}  {category} → {name}")

        response = post_popup_toppings(session, item_id)

        if response:
            toppings = parse_toppings_response(response)
            status = f"✓ payload={response['payload']}  keys={toppings['raw_keys']}"
        else:
            toppings = {"sizes": [], "toppings": [], "extras": [], "raw_keys": []}
            status = "✗ no data returned"

        print(f"         {status}")

        # Save individual raw response
        raw_path = OUTPUT_DIR / f"item_{item_id:05d}.json"
        raw_path.write_text(
            json.dumps({"item": item, "response": response, "parsed": toppings},
                       indent=2, ensure_ascii=False),
            encoding="utf-8"
        )

        all_data.append({
            "item_id":  item_id,
            "name":     name,
            "category": category,
            "sizes":    toppings["sizes"],
            "toppings": toppings["toppings"],
            "extras":   toppings["extras"],
            "raw_response": response,
        })

        time.sleep(0.35)   # polite delay between requests

    return all_data

# ─────────────────────────────────────────────────────────────────────────────
# STEP 6 — Save outputs
# ─────────────────────────────────────────────────────────────────────────────

def save_json(data: list, path: str = "toppings_all_items.json"):
    # Remove raw_response blob for clean output (it's in endpoints_raw/ anyway)
    clean = [{k: v for k, v in d.items() if k != "raw_response"} for d in data]
    with open(path, "w", encoding="utf-8") as f:
        json.dump(clean, f, indent=2, ensure_ascii=False)
    print(f"\n  ✓ JSON  → {path}")


def save_csv(data: list, path: str = "toppings_all_items.csv"):
    rows = []
    for item in data:
        base = {
            "item_id":  item["item_id"],
            "category": item["category"],
            "name":     item["name"],
        }
        # One row per topping
        if item["toppings"]:
            for t in item["toppings"]:
                label = (t.get("name") or t.get("label") or
                         t.get("topping_name") or str(t))
                rows.append({**base, "type": "topping", "option": label,
                             "value": t.get("value", ""), "price": t.get("price", "")})
        if item["extras"]:
            for e in item["extras"]:
                label = (e.get("name") or e.get("label") or str(e))
                rows.append({**base, "type": "extra", "option": label,
                             "value": e.get("value", ""), "price": e.get("price", "")})
        if item["sizes"]:
            for s in item["sizes"]:
                label = s.get("label") or s.get("size_name") or str(s)
                rows.append({**base, "type": "size", "option": label,
                             "value": s.get("value", ""), "price": s.get("price", "")})
        if not any([item["toppings"], item["extras"], item["sizes"]]):
            rows.append({**base, "type": "", "option": "no data", "value": "", "price": ""})

    if not rows:
        print("  ⚠ No rows to write")
        return

    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["item_id","category","name","type","option","value","price"])
        w.writeheader()
        w.writerows(rows)
    print(f"  ✓ CSV   → {path}  ({len(rows)} rows)")

# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 62)
    print("  get_popup_toppings.php — Full Extractor")
    print("=" * 62)

    session = requests.Session()

    # 1. Fetch page (sets cookies, gets raw HTML)
    soup = fetch_html(session)

    # 2. Extract all item IDs from raw HTML
    print("\n→ Scanning HTML for item IDs...")
    items = extract_item_ids(soup)

    if not items:
        print("  ⚠  No item IDs found via data-* attributes or onclick handlers.")
        print("  → Trying global script scan as fallback...")
        global_ids = scan_global_scripts(soup)
        if global_ids:
            print(f"  Found {len(global_ids)} IDs in scripts: {global_ids[:10]}...")
            items = [{"item_id": i, "name": f"Item {i}", "category": "Unknown"}
                     for i in global_ids]
        else:
            print("\n  ✗ No item IDs found at all.")
            print("  This means the site loads item IDs dynamically via JavaScript.")
            print("  → Use the Playwright version instead (see below).")
            print()
            print("  pip install playwright")
            print("  playwright install chromium")
            print()
            print("  Then replace fetch_html() with:")
            print("""
  from playwright.sync_api import sync_playwright

  def fetch_html_playwright():
      with sync_playwright() as p:
          browser = p.chromium.launch(headless=True)
          page = browser.new_page()

          # Intercept the AJAX call to capture real payloads
          toppings_calls = []
          def on_request(req):
              if "get_popup_toppings" in req.url:
                  toppings_calls.append(req.post_data)
          page.on("request", on_request)

          page.goto("https://orderonline.pizzajones.com.au/")
          page.wait_for_selector("li")   # wait for menu to load

          html = page.content()
          browser.close()
          return BeautifulSoup(html, "html.parser"), toppings_calls
""")
            exit(1)

    print(f"  ✓ Found {len(items)} items with IDs")
    for it in items[:5]:
        print(f"    item_id={it['item_id']}  {it['name']}")
    if len(items) > 5:
        print(f"    ... and {len(items)-5} more")

    # 3. POST to endpoint for every item
    all_data = fetch_all_toppings(session, items)

    # 4. Summary
    succeeded = sum(1 for d in all_data
                    if d["sizes"] or d["toppings"] or d["extras"])
    print(f"\n  Items with data returned: {succeeded} / {len(all_data)}")

    # 5. Save
    print("\n→ Saving outputs...")
    save_json(all_data)
    save_csv(all_data)
    print(f"  Raw per-item files → {OUTPUT_DIR}/")

    print("\n" + "=" * 62)
    print("  Done!")
    print("  toppings_all_items.json  — all sizes + toppings + extras")
    print("  toppings_all_items.csv   — flat spreadsheet")
    print(f"  {OUTPUT_DIR}/             — raw response per item")
    print("=" * 62)