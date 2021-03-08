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
  employeeList: any[];
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
        this.fetchEmployeeList();
      },
      err => {
      }
    );
  }

  showReviewList() {
    this.reviewList = [];
    this.authService.assignList(this.employee.username).subscribe(
      data => {
        for (let r of data.reviews) {
          let matched = this.employeeList.find(obj => {
            return obj.username === r.to_user
          })
          if (matched != undefined) {
            this.reviewList.push({to_user:r.to_user, to_fullname: matched.email});
          }
        }
      },
      err => {

      }
    )
  }

  fetchEmployeeList() {
    this.authService.listUsers().subscribe(
      data => {
        this.employeeList = [];
        for (let user of data.users) {
          this.employeeList.push(new Employee(user._id, user.username, user.email, user.age, user.disc));
        }
        this.showReviewList();
      },
      err => {
      }
    );
  }

  assignReview() {
    if (this.review.user_to == undefined) {
      this.errorMessage = "Reviewee not selected";
      this.isReviewAssignFailed = true;
      return;
    }
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