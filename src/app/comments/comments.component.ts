import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Comments, Replies } from '../comments.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './new-comment/new-comment.component';

@Component({
  selector: 'app-comments',
  imports: [FormsModule, CommonModule, NewCommentComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  @Input() commentData!: Comments | Replies;
  @Input() replyTo!: string;
  @Input() currUser!: string;

  commentId!: number;

  isEditing = false;

  showReplyModal = false;

  @Output() deleteClicked = new EventEmitter<number>(); // Emit the ID

  constructor(private dataService: DataService) {}

  triggerDeleteModal() {
    this.deleteClicked.emit(this.commentData.id); // Send ID to parent
  }

  onEdit() {
    this.isEditing = true;
  }

  increaseVote() {
    this.commentData.score += 1;
  }

  decreaseVote() {
    this.commentData.score -= 1;
  }

  showReplyBox(commendId: number) {
    this.commentId = commendId;
    this.showReplyModal = true;
  }

  onReplyAdded(confirmed: boolean) {
    if (confirmed) {
      this.showReplyModal = false;
    }
  }

  updateComment(comment: Comments | Replies, commentText: string) {
    const updatedComment: any = { ...comment, content: commentText };
    this.dataService.updateComment(updatedComment);
    this.isEditing = false;
  }
}
