import { Injectable } from '@angular/core';
import { Employee } from '../entity/Employee';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn:'root'
})
export class EmployeeService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  // In-memory list of employees
  allEmployees:Employee[] = [
    {
      "id": "1",
      "username": "Lalit",
      "email": "Aggarwal",
      "age": 26,
      "designation": "Associate Lead, Technology"
    }
  ];

  // Below are the user APIs
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
