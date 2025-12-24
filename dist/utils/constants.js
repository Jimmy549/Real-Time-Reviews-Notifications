"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_ACTIONS = exports.SOCKET_EVENTS = exports.NOTIFICATION_TYPES = void 0;
exports.NOTIFICATION_TYPES = {
    REVIEW: 'review',
    REPLY: 'reply',
    LIKE: 'like',
    ADMIN: 'admin',
};
exports.SOCKET_EVENTS = {
    NEW_REVIEW: 'new_review',
    NEW_REPLY: 'new_reply',
    REVIEW_LIKED: 'review_liked',
    ADMIN_ACTION: 'admin_action',
};
exports.ADMIN_ACTIONS = {
    REVIEW_DELETED: 'review_deleted',
    REVIEW_FLAGGED: 'review_flagged',
    PRODUCT_UPDATED: 'product_updated',
};
//# sourceMappingURL=constants.js.map