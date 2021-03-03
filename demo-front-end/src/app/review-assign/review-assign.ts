import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../entity/Employee';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router/';

@Component({
  templateUrl: './review-assign.html'
})
export class ReviewAssign implements OnInit {

  employee: Employee;
  reviewee: string;
  review:any = { user_to:null };
  reviewList: any[];
  isReviewAssignFailed = false;
  errorMessage = '';

  // Services injected in constructor
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  // Initializes variables
  ngOnInit() {
    let id = this.route.snapshot.params["id"];

    this.authService.getUser(id).subscribe(
      data => {
        this.employee = new Employee(data.user._id, data.user.username, data.user.email, 0, "");
        this.showReviewList();
      },
      err => {
      }
    );
  }

  showReviewList() {
    this.reviewList = [];
    this.authService.assignList(this.employee.username).subscribe(
      data => {
        this.reviewList = data.reviews;
      },
      err => {

      }
    )
  }

  assignReview() {
    this.authService.assignReview(this.employee.username, this.review.user_to).subscribe(
      data => {
        console.log(data);
        this.showReviewList();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isReviewAssignFailed = true;
      }
    );
  }

  cancelAssign() {
    this.router.navigate(["Employees"]);
  }

}