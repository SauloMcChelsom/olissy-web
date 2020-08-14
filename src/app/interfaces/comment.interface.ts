export interface CommentInterface {
  PRIMARY_KEY?: string;
  FOREIGN_KEY_USER?: string;
  FOREIGN_KEY_PRODUCT?: string;
  FOREIGN_KEY_STORE?: string;
  indexDay?: string;
  commentText?: string;
  commentDate?: string;
  commentImageUrl?: string;
  commentName?: string;
  commentView?: string;
}