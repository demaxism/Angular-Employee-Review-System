import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Employee } from '../entity/Employee';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employee-list.html'
})
export class EmployeeList implements OnInit {
  _listFilterBy: string;
  allEmployees: Employee[];
  filteredList: Employee[];

  isListFailed = false;
  errorMessage = '';

  // Service injected in constructor
  constructor(private authService: AuthService, private router: Router) { }

  // Gets filter by value from the search box
  get listFilterBy(): string {
    return this._listFilterBy;
  }

  // Sets filter by value from the search box
  set listFilterBy(value: string) {
    this._listFilterBy = value;
  }
  
  // Initializes all employees list from employee service
  ngOnInit() {
    this.refreshList();
  }

  // Method to add an employee to the list
  addEmployee(){
    this.router.navigate(["AddEmployee"]);
  }

  // Method to refresh the employee list after successful delete
  refreshList(){
    this.authService.listUsers().subscribe(
      data => {
        this.allEmployees = [];
        for (let user of data.users) {
          this.allEmployees.push(new Employee(user._id, user.username, user.email, user.age, user.disc));
        }
        this.filteredList = this.allEmployees;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isListFailed = true;
      }
    );
  }
}
