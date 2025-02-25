import { Component } from '@angular/core';
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

  ngOnInit() {
    this.dataService.getJsonData().subscribe((response) => {
      this.currentUser = response['currentUser'];
      this.currentUserName = this.currentUser.username;
      this.currentUserPic = this.currentUser.image.png;
    });
  }

  addComment(form: NgForm) {
    let commentData = {
      id: Math.random().toString(),
      content: form.value.comment,
      createdAt: 'Today',
      score: '0',
      user: this.currentUser,
      replies: [],
    };

    this.dataService.addComment(commentData);

    form.resetForm();
  }
}
