# Playwright Snippets

Use these patterns when browser automation is available.

## Open a local URL

```js
await page.goto("http://127.0.0.1:8765/index.html");
await page.waitForLoadState("networkidle");
```

## Desktop screenshot

```js
await page.setViewportSize({ width: 1440, height: 1000 });
await page.screenshot({ path: "face-it-surface-before.png", fullPage: true });
```

## Narrow viewport screenshot

```js
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: "face-it-surface-narrow.png", fullPage: true });
```

## Console errors

```js
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
```

## Accessibility-lite: contrast, names, target size

Compute contrast from resolved colors, read accessible names, and flag small targets on the narrow viewport.

```js
const findings = await page.evaluate(() => {
  const srgb = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const lum = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  const parse = (c) => (c.match(/\d+(\.\d+)?/g) || []).map(Number);
  const ratio = (fg, bg) => {
    const [l1, l2] = [lum(...fg), lum(...bg)].sort((a, b) => b - a);
    return (l1 + 0.05) / (l2 + 0.05);
  };
  const out = { lowContrast: [], missingName: [], smallTarget: [] };
  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    const text = el.textContent && el.textContent.trim();
    if (text && el.children.length === 0) {
      const fg = parse(s.color), bg = parse(s.backgroundColor);
      if (fg.length >= 3 && bg.length >= 3 && bg[3] !== 0) {
        const r = ratio(fg, bg);
        const big = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
        if (r < (big ? 3 : 4.5)) out.lowContrast.push({ text: text.slice(0, 40), ratio: +r.toFixed(2) });
      }
    }
    const interactive = ["A", "BUTTON"].includes(el.tagName) || el.getAttribute("role") === "button";
    if (interactive) {
      const name = (el.textContent || "").trim() || el.getAttribute("aria-label") || el.getAttribute("title");
      if (!name) out.missingName.push(el.tagName.toLowerCase());
      const b = el.getBoundingClientRect();
      if (b.width && (b.width < 44 || b.height < 44)) out.smallTarget.push({ tag: el.tagName.toLowerCase(), w: Math.round(b.width), h: Math.round(b.height) });
    }
    if (el.tagName === "IMG" && !el.getAttribute("alt")) out.missingName.push("img");
  }
  return out;
});
```

Capture a focused state to confirm a visible focus indicator:

```js
await page.keyboard.press("Tab");
await page.screenshot({ path: "face-it-surface-focus.png" });
```

## State matrix: force loading and error via network mock

```js
// Force a slow/hanging response to capture the loading state.
await page.route("**/api/**", (route) => setTimeout(() => route.abort(), 4000));
await page.reload();
await page.screenshot({ path: "face-it-surface-state-loading.png" });

// Force an error response to capture the error state.
await page.unroute("**/api/**");
await page.route("**/api/**", (route) => route.fulfill({ status: 500, body: "{}" }));
await page.reload();
await page.screenshot({ path: "face-it-surface-state-error.png" });
await page.unroute("**/api/**");
```

Trigger empty and interactive states through the UI (clear filters, submit an empty form, hover, tab) rather than mocks where possible. Never edit app code to force a state.

## Reference compare: render a reference URL at the same viewport

```js
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(referenceUrl);
await page.waitForLoadState("networkidle");
await page.screenshot({ path: "face-it-surface-reference.png", fullPage: true });
// Then render the target at the same viewport and compare side by side by eye.
```

## Hardcoded color scan for HTML artifacts

```powershell
Select-String -Path .\artifact.html -Pattern '#[0-9a-fA-F]{3,8}|rgb\(|hsl\(' -AllMatches
```

For Clawpilot artifacts, allowed colors should come from the required `--cp-*` variables.

## Face-It Doctor

Use the packaged helper for the standard first-pass check:

```powershell
npm run doctor -- .\artifact.html --surface dashboard
npm run doctor -- http://127.0.0.1:3000 --surface app-home
```

It emits a report, screenshots, console errors, and a scorecard stub.
