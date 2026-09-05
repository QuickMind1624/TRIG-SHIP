# PDF Upload Guide — TRIGO-LAB

## GitHub Pages structure

Keep the published site root like this:

```text
repository-root/
├── index.html
├── style.css
├── responsive-v2.css
├── script.js
├── data/
├── pdfs/
│   └── your-file.pdf
└── .nojekyll
```

`pdfs/` must be beside `index.html`, not inside another nested project folder unless that nested folder is the GitHub Pages publishing root.

## Add a PDF without rebuilding a ZIP

1. Open the GitHub repository.
2. Open the `pdfs` folder.
3. Choose **Add file → Upload files**.
4. Upload the PDF.
5. Commit the change to the branch/folder used by GitHub Pages.
6. Wait for the Pages deployment to finish.

The workflow in `.github/workflows/build-pdf-manifest.yml` automatically adds new PDFs to `pdfs/manifest.json`. Existing metadata is preserved. New PDFs default to **All Classes**, **Other subject**, and **Free** until you edit their metadata.

## If Open PDF gives 404

Check these exact points:

- The PDF is actually committed to the same branch GitHub Pages publishes.
- `index.html` and `pdfs/` are at the same published root.
- The filename and capitalization match exactly. GitHub Pages paths are case-sensitive.
- GitHub Pages is publishing `/(root)` if `index.html` is at repository root, or the correct `/docs` folder if you deliberately use `docs`.
- Open the PDF file from the GitHub repository itself and confirm it exists.
- Then open the corresponding Pages URL ending in `/pdfs/<exact-filename>.pdf`.

The site also provides an in-page PDF viewer plus a direct **Download PDF** link.
