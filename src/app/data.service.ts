import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Comments, Data, Replies } from './data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private url = 'data.json';
  private commentsList = new BehaviorSubject<Comments[]>(
    this.loadFromLocalStorage()
  );

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchComments();
  }

  getJsonData() {
    return this.httpClient.get<Data>(this.url);
  }

  fetchComments() {
    if (this.loadFromLocalStorage().length === 0) {
      this.httpClient.get<Data>(this.url).subscribe((data) => {
        this.commentsList.next(data['comments']);
        this.saveToLocalStorage(data['comments']);
      });
    }
  }

  getCommentsList() {
    return this.commentsList.asObservable();
  }

  addComment(newComment: Comments) {
    const updatedList = [...this.commentsList.getValue(), newComment];
    this.commentsList.next(updatedList);
    this.saveToLocalStorage(updatedList);
  }

  addReply(commentId: number, newReply: Replies) {
    const comments = this.commentsList.getValue();
    let isReplyAdded = false;

    const updatedComments = [...comments];

    updatedComments.forEach((comment) => {
      // check out the comment if it matches the ID
      if (comment.id === +commentId) {
        comment.replies = [...comment.replies, newReply];
        isReplyAdded = true;
      } else {
        // If no comment was found, check replies
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            comment.replies = [...comment.replies, newReply];
            isReplyAdded = true;
          }
        });
      }
    });

    if (isReplyAdded) {
      this.commentsList.next(updatedComments);
      this.saveToLocalStorage(updatedComments);
    }
  }

  deleteComment(commentId: number) {
    const originalListLength = this.commentsList.getValue().length;

    // Filter out the comment if it matches the ID
    const updatedList = this.commentsList
      .getValue()
      .filter((comment) => comment.id !== +commentId);

    if (originalListLength !== updatedList.length) {
      this.commentsList.next(updatedList);
      this.saveToLocalStorage(updatedList);
    } else {
      // If no comment was removed, check replies
      const replyList = this.commentsList.getValue().map((comment) => {
        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== commentId),
        };
      });

      this.commentsList.next(replyList);
      this.saveToLocalStorage(replyList);
    }
  }

  updateComment(updatedComment: Comments) {
    const updatedList = this.commentsList
      .getValue()
      .map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      );
    this.commentsList.next(updatedList);
    this.saveToLocalStorage(updatedList);
  }

  private saveToLocalStorage(comments: Comments[]) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  private loadFromLocalStorage(): Comments[] {
    const storedComments = localStorage.getItem('comments');
    return storedComments ? JSON.parse(storedComments) : [];
  }
}
