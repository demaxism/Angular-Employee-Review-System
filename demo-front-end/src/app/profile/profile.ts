import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router/';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  currentUser: any;
  reviewList: any[];

  constructor(private token: TokenStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.showReviewList(this.currentUser.username);
  }

  showReviewList(from_user:string) {
    this.authService.assignList(from_user).subscribe(
      data => {
        this.reviewList = data.reviews;
      },
      err => {

      }
    )
  }

  reviewForm(to_user:string) {
    this.router.navigate(["ReviewForm/"+ to_user]);
  }
}
