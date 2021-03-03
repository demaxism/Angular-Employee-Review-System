import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../entity/Employee';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee-service';
import { Router } from '@angular/router/';

@Component({
  templateUrl: './edit-employee.html',
  styleUrls: ['./edit-employee.scss']
})
export class EditEmployee implements OnInit {

  employee: Employee;

  // Services injected in constructor
  constructor(private employeeService: EmployeeService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  // Initializes variables
  ngOnInit() {
    var id = this.route.snapshot.params["id"];
    //this.employee = this.employeeService.getEmployee(id);
    this.authService.getUser(id).subscribe(
      data => {
        this.employee = new Employee(data.user._id, data.user.username, data.user.email, data.user.age, data.user.disc);
      },
      err => {

      }
    );
  }

  // Method to update and employee
  updateEmployee(){
    this.authService.editUser(this.employee.username, this.employee.email, this.employee.age, this.employee.designation).subscribe(
      data => {
        this.router.navigate(["Employees"]);
      },
      err => {

      }
    );
  }

  // Method to cancel update employee operation
  cancelEmployee(){
    this.router.navigate(["Employees"]);
  }
}
