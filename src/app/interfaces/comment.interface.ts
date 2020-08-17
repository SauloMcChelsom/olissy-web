export interface CommentInterface {
  indexDay?: string;
  PRIMARY_KEY?: string;
  FOREIGN_KEY_USER?: string;
  FOREIGN_KEY_PRODUCT?: string;
  FOREIGN_KEY_STORE?: string;
  commentText?: string;
  commentDate?: string;
  commentImageUrl?: string;
  commentName?: string;
  commentView?: boolean;
}