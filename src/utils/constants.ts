export const NOTIFICATION_TYPES = {
  REVIEW: 'review',
  REPLY: 'reply',
  LIKE: 'like',
  ADMIN: 'admin',
};

export const SOCKET_EVENTS = {
  NEW_REVIEW: 'new_review',
  NEW_REPLY: 'new_reply',
  REVIEW_LIKED: 'review_liked',
  ADMIN_ACTION: 'admin_action',
};

export const ADMIN_ACTIONS = {
  REVIEW_DELETED: 'review_deleted',
  REVIEW_FLAGGED: 'review_flagged',
  PRODUCT_UPDATED: 'product_updated',
};