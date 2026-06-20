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

## Hardcoded color scan for HTML artifacts

```powershell
Select-String -Path .\artifact.html -Pattern '#[0-9a-fA-F]{3,8}|rgb\(|hsl\(' -AllMatches
```

For Clawpilot artifacts, allowed colors should come from the required `--cp-*` variables.
