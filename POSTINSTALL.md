# Firestore Auto Document ID — Installed

The extension is active. From now on, every new document created in any
top-level Firestore collection will automatically receive the field
**`${param:ID_FIELD_NAME}`** set to the document's own ID.

## What happens

1. A document is created at `{collection}/{docId}`.
2. The Cloud Function fires and checks whether `${param:ID_FIELD_NAME}` already
   equals `{docId}`.
3. If not, it writes `{ ${param:ID_FIELD_NAME}: "{docId}" }` back to the
   document.

## Subcollections

This extension only watches **top-level** collection documents
(`{collection}/{docId}`). It does **not** trigger for subcollections
(e.g. `users/abc/posts/xyz`). To support subcollections, a custom Cloud
Function with a wildcard path like `{col}/{id}/{sub}/{subId}` would be needed.
