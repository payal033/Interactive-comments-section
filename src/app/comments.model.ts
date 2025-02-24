export interface Comments {
  id: string;
  content: string;
  createdAt: string;
  score: string;
  user: User;
  replies: Replies[];
}

export interface Replies {
  id: string;
  content: string;
  createdAt: string;
  replyingTo: string;
  score: string;
  user: User;
}

export interface User {
  username: string;
  image: UserImage;
}

export interface UserImage {
  png: string;
  webp: string;
}

export interface Data {
  currentUser: User;
  comments: Comments[]; // Ensure comments is an ARRAY
}
