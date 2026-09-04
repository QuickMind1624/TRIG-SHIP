# TRIGO LAB — Adding resources without rebuilding the ZIP

## PDFs

When the site is hosted on GitHub Pages:

1. Open the repository on GitHub.
2. Open the `pdfs/` folder.
3. Click **Add file → Upload files**.
4. Upload the new `.pdf`.
5. Commit the change.
6. The GitHub Action updates `pdfs/manifest.json` automatically.
7. Refresh the Learning Hub.

You do **not** need to rebuild or download a ZIP every time.

### Important metadata rule

A newly discovered PDF is automatically given `Class 9`, `Class 10`, `Class 11`, `Class 12`-compatible catalogue support through the Learning Hub filters, but its initial generated metadata is `Other / Other` unless you edit its manifest entry.

To place it in the correct class and subject, edit its object in `pdfs/manifest.json` after the first automatic build, for example:

```json
{
  "id": "my-new-pdf",
  "title": "My New Notes",
  "classLevel": "Class 11",
  "subject": "Physics",
  "status": "free",
  "type": "pdf",
  "description": "Deep concept notes.",
  "tags": ["physics", "free notes"],
  "file": "pdfs/my-new-pdf.pdf",
  "actionLabel": "Open PDF"
}
```

The workflow is designed to preserve metadata you have already entered.

## Web links / YouTube / posts

For a resource that is not a PDF, add an object to `data/notes.js`. This also requires **no ZIP rebuild** when you edit it directly in GitHub.

Examples of supported `type` values:

- `link` — normal website/resource
- `youtube` — YouTube video/channel
- `post` — a post/social resource
- `pdf` — local PDF

Use `url` for external resources and `file` for local PDFs.

Example:

```js
{
  id:'friend-physics-video',
  title:'Physics — Rotational Motion',
  classLevel:'Class 11',
  subject:'Physics',
  status:'free',
  type:'youtube',
  description:'A useful external explanation.',
  tags:['rotation','physics'],
  url:'PASTE_THE_REAL_LINK_HERE',
  actionLabel:'Watch / Open'
}
```

## Local testing

Opening `index.html` directly with `file://` can block JavaScript `fetch()` calls in some browsers. The Learning Hub therefore keeps its catalogue in `data/notes.js` as a local fallback.

For the most reliable local test, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.
