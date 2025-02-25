import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Comments, Replies } from '../comments.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [DeleteModalComponent, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  @Input() commentData!: Comments | Replies;
  @Input() replyTo!: string;
  @Input() currUser!: string;

  commentId!: string;

  isEditing = false;

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

  onEdit() {
    this.isEditing = true;
  }

  increaseVote() {}

  decreaseVote() {}

  updateComment(comment: Comments | Replies, commentText: string) {
    const updatedComment: any = { ...comment, content: commentText };
    this.dataService.updateComment(updatedComment);
    this.isEditing = false;
  }
}
