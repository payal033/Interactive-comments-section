import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Comments, Replies } from '../comments.model';

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  @Input() commentData!: Comments | Replies;
  @Input() replyTo!: string;
  @Input() currUser!: string;
}
