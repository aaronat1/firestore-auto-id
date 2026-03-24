# Firestore Auto Document ID

This extension automatically assigns the Firestore document ID as a field
inside the document whenever a new document is created in **any** top-level
collection of your project.

## Example

If you create a document at `users/abc123`, the extension will automatically
add the field `id: "abc123"` to that document.

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `ID_FIELD_NAME` | The field name to write the document ID into | `id` |

## Billing

This extension uses Cloud Functions and Firestore, both of which may incur
costs beyond the free tier. See the
[Firebase pricing page](https://firebase.google.com/pricing) for details.
