# Bracket & Bevel — GA4 test site

A 4-page static site (`index.html`, `work.html`, `about.html`, `contact.html`) for testing Google Analytics pageview and event tracking. No build step, no backend — just open the files or host them anywhere static.

## 1. Wire up your real GA4 property

Every page has this snippet in `<head>`, with a placeholder ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VG3MJC6J0P"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-VG3MJC6J0P');
</script>
```

Replace **both** occurrences of `G-XXXXXXXXXX` (in the `src` URL and in the `gtag('config', ...)` call) on **all four pages** with your real GA4 Measurement ID (Admin → Data Streams → your stream, in the GA4 UI).

Quick way to do it from a terminal, from inside this folder:

```bash
sed -i '' 's/G-XXXXXXXXXX/G-YOUR-REAL-ID/g' *.html   # macOS
sed -i 's/G-XXXXXXXXXX/G-YOUR-REAL-ID/g' *.html       # Linux
```

## 2. What's already tracked

- **Pageviews** — automatic on every page load via `gtag('config', ...)`.
- **Custom events**, fired from `script.js` via a small `trackEvent(name, params)` helper:
  - `cta_click` — every button tagged `data-track="cta_click"` (hero buttons, "start a commission" links, etc). `data-track-label` says which one.
  - `piece_view` — each portfolio tile, tagged the same way, in case you want to see which pieces get attention.
  - `contact_form_submit` — fires when the contact form is submitted (the form has no backend; it just shows a thank-you message locally).

To add tracking to a new element, just add `data-track="your_event_name"` and optionally `data-track-label="something"` — no JS changes needed.

## 3. Testing before you trust the numbers

- GA4's **DebugView** (Admin → DebugView) shows events in near-real-time. Easiest way to see them while testing: install the [Google Analytics Debugger extension](https://chrome.google.com/webstore) or add `?debug_mode=true` handling — or just watch the browser console, since every event also logs there as `[GA event] ...`.
- Standard GA4 reports (Realtime, Engagement) can take a few minutes to a few hours to populate — don't expect instant numbers outside DebugView.
- Ad blockers and some privacy browsers block `googletagmanager.com` — test in a plain Chrome/Firefox profile if events seem to be missing.
- GA4 works fine served from `localhost` or opened as a local file for basic testing, but for anything resembling real traffic patterns (referrers, channels), host it somewhere with a real domain.

## 4. Structure

```
index.html    Home
work.html     Portfolio grid (6 pieces)
about.html    Process + materials
contact.html  Form (client-side only) + shop info
style.css     Shared design tokens & layout
script.js     Nav toggle, trackEvent() helper, form handling
```
