import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../comments.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-comment-list',
  imports: [CommentsComponent, DeleteModalComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  commentsList: Comments[] = [];
  currentUser!: string;

  showDeleteModal = false;
  commentId!: number;

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

  openDeleteModal(commentId: number) {
    this.commentId = commentId;
    this.showDeleteModal = true;
  }

  onConfirmDelete(confirmed: boolean) {
    if (confirmed) {
      this.dataService.deleteComment(this.commentId);
    }
    this.showDeleteModal = false;
  }
}
