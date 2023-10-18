"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
// @ts-nocheck
const firestore_1 = require("firebase-functions/v2/firestore");
const options_1 = require("firebase-functions/v2/options");
const app_1 = require("firebase-admin/app");
const firestore_2 = require("firebase-admin/firestore");
const moment = require("moment");
(0, options_1.setGlobalOptions)({ maxInstances: 10 });
(0, app_1.initializeApp)();
const db = (0, firestore_2.getFirestore)();
exports.onCreateDocument = (0, firestore_1.onDocumentCreated)('messages/{messageId}/chats/{chatId}', event => {
    const messageId = event.params.messageId;
    const snapShot = event.data;
    // If we set `/users/marie` to {name: "Marie"} then
    const data = snapShot === null || snapShot === void 0 ? void 0 : snapShot.data();
    db.doc(`groups/${messageId}`).set({
        message: data.message,
        updatedAt: moment().toISOString(),
    }, { merge: true });
    // event.params.userId == "marie"
    // event.data.after.data() == {name: "Marie"} {name: "Marie"}
    return true;
});
//# sourceMappingURL=index.js.map