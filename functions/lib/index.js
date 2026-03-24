"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDocumentIdL5 = exports.assignDocumentIdL4 = exports.assignDocumentIdL3 = exports.assignDocumentIdL2 = exports.assignDocumentIdL1 = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();
const ID_FIELD_NAME = (_a = process.env.ID_FIELD_NAME) !== null && _a !== void 0 ? _a : "id";
/**
 * Shared handler: writes the document ID into the configured field.
 * The document ID is always the last segment of the document path.
 */
async function handleCreate(snapshot) {
    const docId = snapshot.ref.id;
    const data = snapshot.data();
    if (data[ID_FIELD_NAME] === docId) {
        functions.logger.info(`[${snapshot.ref.path}] Field "${ID_FIELD_NAME}" already set. Skipping.`);
        return null;
    }
    functions.logger.info(`[${snapshot.ref.path}] Setting field "${ID_FIELD_NAME}" = "${docId}"`);
    await snapshot.ref.update({ [ID_FIELD_NAME]: docId });
    return null;
}
// Level 1 — top-level collections
// e.g. users/abc123
exports.assignDocumentIdL1 = functions.firestore
    .document("{c1}/{d1}")
    .onCreate((snap) => handleCreate(snap));
// Level 2 — first subcollection
// e.g. users/abc123/posts/xyz
exports.assignDocumentIdL2 = functions.firestore
    .document("{c1}/{d1}/{c2}/{d2}")
    .onCreate((snap) => handleCreate(snap));
// Level 3 — second subcollection
// e.g. users/abc123/posts/xyz/comments/abc
exports.assignDocumentIdL3 = functions.firestore
    .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}")
    .onCreate((snap) => handleCreate(snap));
// Level 4 — third subcollection
// e.g. users/abc123/posts/xyz/comments/abc/likes/def
exports.assignDocumentIdL4 = functions.firestore
    .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}/{c4}/{d4}")
    .onCreate((snap) => handleCreate(snap));
// Level 5 — fourth subcollection
// e.g. users/abc123/posts/xyz/comments/abc/likes/def/reactions/ghi
exports.assignDocumentIdL5 = functions.firestore
    .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}/{c4}/{d4}/{c5}/{d5}")
    .onCreate((snap) => handleCreate(snap));
//# sourceMappingURL=index.js.map