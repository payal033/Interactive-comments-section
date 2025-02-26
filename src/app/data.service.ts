import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Comments, Replies } from './comments.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private url = 'data.json';
  private commentsList = new BehaviorSubject<Comments[]>([]);

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  getJsonData() {
    return this.httpClient.get<Data>(this.url);
  }

  fetchComments() {
    this.httpClient.get<Data>(this.url).subscribe((data) => {
      this.commentsList.next(data['comments']); // Update BehaviorSubject
    });
  }

  getCommentsList() {
    return this.commentsList.asObservable();
  }

  addComment(newComment: Comments) {
    const updatedList = [...this.commentsList.getValue(), newComment];
    this.commentsList.next(updatedList);
  }

  addReply(commentId: number, newReply: Replies) {
    const comments = this.commentsList.getValue();
    let isReplyAdded = false;

    const updatedComments = [...comments];

    updatedComments.forEach((comment) => {
      if (comment.id === +commentId) {
        comment.replies = [...comment.replies, newReply];
        isReplyAdded = true;
      } else {
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
    } else {
      // If no comment was removed, check replies
      const replyList = this.commentsList.getValue().map((comment) => {
        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== commentId),
        };
      });

      this.commentsList.next(replyList);
    }

    // console.log('Updated list length ' + this.commentsList.getValue().length);
  }

  updateComment(updatedComment: Comments) {
    const updatedList = this.commentsList
      .getValue()
      .map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      );
    this.commentsList.next(updatedList);
  }
}
