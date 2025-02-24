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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getJsonData().subscribe((data) => {
      this.commentsList = data['comments'];
    });
  }
}
