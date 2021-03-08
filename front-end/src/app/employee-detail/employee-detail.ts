import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Employee } from '../entity/Employee';

@Component({
  selector: 'app-employeedetail',
  templateUrl: './employee-detail.html'
})
export class EmployeeDetail {

  // Input variable to display properties of an employee
  @Input() employee: Employee;

  // Output variable used to tell the parent component to refesh the employee list after successful delete
  @Output() refreshEmployeeList: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  // Service injected in constructor
  constructor(private authService: AuthService, private router: Router) { 
  }

  // Method to edit employee details
  editEmployee(){
    this.router.navigate(["EditEmployee/"+ this.employee.id]);
  }
  
  // Method to delete an employee
  deleteEmployee(employeeToBeDeleted: Employee){
    var result = confirm("Are you sure, you want to delete this Employee?");
    if (result) {
      this.authService.deleteUser(this.employee.username).subscribe(
        data => {
          this.refreshEmployeeList.emit(true);
          this.router.navigate(["Employees"]);
        },
        err => {
  
        }
      );
    } 
  }

  assignReview() {
    this.router.navigate(["ReviewAssign/"+ this.employee.id]);
  }
}