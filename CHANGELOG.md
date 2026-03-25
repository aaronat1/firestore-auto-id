## Version 0.1.3

- Add extension icon.

## Version 0.1.2

- Fix: Upgraded runtime from nodejs18 (decommissioned) to nodejs20.

## Version 0.1.1

- Fix: Added required `LOCATION` parameter so Cloud Functions deploy correctly.

## Version 0.1.0

- Initial release.
- Automatically assigns the Firestore document ID as a field on document creation.
- Supports top-level collections and up to 5 levels of subcollections.
- Field name is configurable via the `ID_FIELD_NAME` parameter (default: `id`).
