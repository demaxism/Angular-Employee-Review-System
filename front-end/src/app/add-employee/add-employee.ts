import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../entity/Employee';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './add-employee.html'
})
export class AddEmployee {

  username:string;
  email:string;
  password:string;
  age:number;
  designation:string;
  employee: Employee;

  isSignUpFailed = false;
  errorMessage = '';

  // Services injected in constructor
  constructor(
    private authService:AuthService,
    private router: Router) { 
  }

  // Method to save an employee
  saveEmployee(){
    this.authService.register(this.username, this.email, this.password, this.age, this.designation).subscribe(
      data => {
        console.log(data);
        this.router.navigate(["Employees"]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  // Method to cancel the add operation
  cancelEmployee(){
    this.router.navigate(["Employees"]);
  }
}
