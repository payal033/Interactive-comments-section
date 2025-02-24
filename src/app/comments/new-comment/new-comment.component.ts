import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-new-comment',
  imports: [],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css',
})
export class NewCommentComponent {
  constructor(private dataService: DataService) {}

  currentUser!: any;
  currentUserName!: any;
  currentUserPic!: any;

  ngOnInit() {
    this.dataService.getJsonData().subscribe((response) => {
      this.currentUser = response['currentUser'];
      this.currentUserName = this.currentUser.username;
      this.currentUserPic = this.currentUser.image.png;
      console.log(this.currentUser);
    });
  }
}
