import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Comments, Replies } from '../comments.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-comments',
  imports: [DeleteModalComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  @Input() commentData!: Comments | Replies;
  @Input() replyTo!: string;
  @Input() currUser!: string;

  commentId!: string;

  showDeleteModal = false;

  constructor(private dataService: DataService) {}

  openDeleteDialog(commentId: string) {
    this.commentId = commentId;
    this.showDeleteModal = true;
  }

  onConfirmDelete(confirmed: boolean) {
    if (confirmed) {
      this.dataService.deleteComment(this.commentId);
      console.log('deleted comment');
    }
    this.showDeleteModal = false;
  }

  increaseVote() {}

  decreaseVote() {}
}
