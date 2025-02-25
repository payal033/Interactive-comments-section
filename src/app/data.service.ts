import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Comments, User } from './comments.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private url = 'data.json';
  private commentsList = new BehaviorSubject<Comments[]>([]);
  private currentUser = new BehaviorSubject({});

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

  deleteComment(commentId: string) {
    const updatedList = this.commentsList
      .getValue()
      .filter((comment) => comment.id != commentId);

    this.commentsList.next(updatedList);
  }

  updateComment() {}
}
