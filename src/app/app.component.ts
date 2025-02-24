import { Component } from '@angular/core';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentListComponent } from './comment-list/comment-list.component';

@Component({
  selector: 'app-root',
  imports: [NewCommentComponent, CommentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'comments-section';
}
