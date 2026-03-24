import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const ID_FIELD_NAME = process.env.ID_FIELD_NAME ?? "id";

/**
 * Shared handler: writes the document ID into the configured field.
 * The document ID is always the last segment of the document path.
 */
async function handleCreate(
  snapshot: functions.firestore.QueryDocumentSnapshot
): Promise<null> {
  const docId = snapshot.ref.id;
  const data = snapshot.data();

  if (data[ID_FIELD_NAME] === docId) {
    functions.logger.info(
      `[${snapshot.ref.path}] Field "${ID_FIELD_NAME}" already set. Skipping.`
    );
    return null;
  }

  functions.logger.info(
    `[${snapshot.ref.path}] Setting field "${ID_FIELD_NAME}" = "${docId}"`
  );

  await snapshot.ref.update({ [ID_FIELD_NAME]: docId });
  return null;
}

// Level 1 — top-level collections
// e.g. users/abc123
export const assignDocumentIdL1 = functions.firestore
  .document("{c1}/{d1}")
  .onCreate((snap) => handleCreate(snap));

// Level 2 — first subcollection
// e.g. users/abc123/posts/xyz
export const assignDocumentIdL2 = functions.firestore
  .document("{c1}/{d1}/{c2}/{d2}")
  .onCreate((snap) => handleCreate(snap));

// Level 3 — second subcollection
// e.g. users/abc123/posts/xyz/comments/abc
export const assignDocumentIdL3 = functions.firestore
  .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}")
  .onCreate((snap) => handleCreate(snap));

// Level 4 — third subcollection
// e.g. users/abc123/posts/xyz/comments/abc/likes/def
export const assignDocumentIdL4 = functions.firestore
  .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}/{c4}/{d4}")
  .onCreate((snap) => handleCreate(snap));

// Level 5 — fourth subcollection
// e.g. users/abc123/posts/xyz/comments/abc/likes/def/reactions/ghi
export const assignDocumentIdL5 = functions.firestore
  .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}/{c4}/{d4}/{c5}/{d5}")
  .onCreate((snap) => handleCreate(snap));
