export interface Comments {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Replies[];
}

export interface Replies {
  id: string;
  content: string;
  createdAt: string;
  replyingTo: string;
  score: number;
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
  comments: Comments[];
}
