import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../comments.model';

@Component({
  selector: 'app-comment-list',
  imports: [CommentsComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  commentsList: Comments[] = [];
  currentUser!: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCommentsList().subscribe((comments) => {
      this.commentsList = comments;
    });

    this.dataService.fetchComments();

    this.dataService.getJsonData().subscribe((response) => {
      this.currentUser = response['currentUser'].username;
    });
  }
}
