import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../entity/Employee';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { 
    this.currentUser = new Employee();
  }

  public currentUser:Employee;

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, age:number, disc:string, roles:string[] = ["user"]): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      age,
      disc,
      roles,
    }, httpOptions);
  }

  listUsers(): Observable<any> {
    return this.http.get(AUTH_API + 'listusers');
  }

  getUser(id:string): Observable<any> {
    return this.http.post(AUTH_API + 'getuser', {
      userid:id
    }, httpOptions);
  }

  editUser(username:string, fullname: string, rank:number, disc:string): Observable<any> {
    return this.http.post(AUTH_API + 'edituser', {
      username,
      fullname,
      rank,
      disc,
    }, httpOptions);
  }

  deleteUser(username:string): Observable<any> {
    return this.http.post(AUTH_API + 'deleteuser', {
      username:username
    }, httpOptions);
  }

  assignReview(from:string, to:string): Observable<any> {
    return this.http.post(AUTH_API + 'assignreview', {
      from_user:from,
      to_user:to,
    }, httpOptions);
  }

  assignList(from:string): Observable<any> {
    return this.http.post(AUTH_API + 'reviewfrom', {
      from_user:from
    }, httpOptions);
  }

  submitReview(from_user:string, to_user:string, content:string): Observable<any> {
    return this.http.post(AUTH_API + 'submitreview', {
      from_user:from_user,
      to_user:to_user,
      content:content
    }, httpOptions);
  }
}
