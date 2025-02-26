import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Comments, Replies } from '../data.model';
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
  commentId!: number;
  isEditing = false;
  showReplyModal = false;

  @Input() commentData!: Comments | Replies;
  @Input() replyTo!: string;
  @Input() currUser!: string;
  @Output() deleteClicked = new EventEmitter<number>();

  constructor(private dataService: DataService) {}

  triggerDeleteModal() {
    this.deleteClicked.emit(this.commentData.id);
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
