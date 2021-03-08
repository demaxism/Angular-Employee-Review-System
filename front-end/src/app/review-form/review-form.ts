import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router/';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.html'
})
export class ReviewForm implements OnInit {
  currentUser: any;
  reviewee:string;
  reviewContent:string;
  isReviewSubmitFailed = false;
  errorMessage = '';

  constructor(
      private token: TokenStorageService, 
      private authService: AuthService, 
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.reviewee = this.route.snapshot.params["to_user"];
  }

  submitReview():void {
    this.authService.submitReview(this.currentUser.username, this.reviewee, this.reviewContent).subscribe(
        data => {
            this.router.navigate(["profile"]);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isReviewSubmitFailed = true;
        }
      );
  }

  cancelReview() {
    this.router.navigate(["profile"]);
  }
}