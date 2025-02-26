import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Comments, User } from '../../comments.model';

@Component({
  selector: 'app-new-comment',
  imports: [FormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css',
})
export class NewCommentComponent {
  constructor(private dataService: DataService) {}

  currentUser!: User;
  currentUserName!: string;
  currentUserPic!: string;
  commentsList: Comments[] = [];
  comment!: string;

  @Input() commentID!: number;
  @Input() replyingToUser!: string;
  @Input() addingReply: boolean = false;

  @Output() confirmReply = new EventEmitter<boolean>();

  ngOnInit() {
    this.dataService.getJsonData().subscribe((response) => {
      this.currentUser = response['currentUser'];
      this.currentUserName = this.currentUser.username;
      this.currentUserPic = this.currentUser.image.png;
    });
  }

  addComment(form: NgForm) {
    if (form.value.comment == '') {
      alert('Please enter valid comment!');
      return;
    }

    let commentData = {
      id: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
      content: form.value.comment,
      createdAt: 'Today',
      score: 0,
      user: this.currentUser,
      replies: [],
    };

    this.dataService.addComment(commentData);

    form.resetForm();
  }

  addReply(form: NgForm) {
    if (form.value.comment == '') {
      alert('Please enter valid data!');
      return;
    }

    const replyData = {
      id: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
      content: form.value.comment,
      createdAt: 'Today',
      score: 0,
      user: this.currentUser,
      replyingTo: this.replyingToUser,
    };

    console.log(replyData);

    this.dataService.addReply(this.commentID, replyData);

    form.resetForm();

    this.confirmReply.emit(true);
  }
}
