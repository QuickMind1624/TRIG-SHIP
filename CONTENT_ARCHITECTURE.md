# TRIGO LAB content architecture

## Current model
- `data/notes.js`: public metadata catalogue only.
- `notes.js`: compatibility copy for simple static hosting.
- `data/site-config.js`: public site configuration such as the sponsorship destination.
- `Learning Hub`: filters resources by class, subject and access level.

## Adding future notes
Add one metadata object to `data/notes.js`:
- `id`: stable unique slug.
- `title`: display title.
- `classLevel`: e.g. Class 10, Class 11, Class 12, Advanced.
- `subject`: e.g. Mathematics, Physics, Chemistry, Python.
- `status`: `free`, `premium`, or `planned`.
- `description`: short public description.
- `tags`: searchable classification labels.

## Recommended future hierarchy
Class -> Subject -> Chapter -> Concept -> Resource type -> Access tier.
Resource types can later include Notes, Derivation, Examples, Practice, Visualizer, Worksheet and Revision.

## Monetisation/security rule
A static HTML/JS site cannot securely protect premium files. Do not hide premium PDFs behind JavaScript, CSS, obscure filenames, or client-side flags. When paid content launches, use server-side authentication/authorization and verify payment on the server before issuing access.

Never place payment API secrets, private storage credentials, webhook secrets, database passwords, or service tokens in this repository.

## Sponsorship
Set `window.TRIGO_SUPPORT_URL` in `data/site-config.js` to the real sponsorship destination before publishing. Do not leave the placeholder as a public payment button.
