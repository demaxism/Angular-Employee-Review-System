import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeeDetail } from './employee-detail/employee-detail';
import { AddEmployee } from './add-employee/add-employee';
import { EditEmployee } from './edit-employee/edit-employee';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { ReviewAssign } from './review-assign/review-assign';
import { ReviewForm } from './review-form/review-form';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path:"Employees", component:EmployeeList },
  { path:"AddEmployee", component:AddEmployee },
  { path:"EditEmployee/:id", component:EditEmployee },
  { path:"ReviewAssign/:id", component:ReviewAssign},
  { path:"ReviewForm/:to_user", component:ReviewForm},
  { path:"home", component:Home },
  { path:"register", component:Register},
  { path:"login", component:Login },
  { path: 'profile', component: Profile },
  { path:"**", redirectTo:'Employees' },
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetail,
    AddEmployee,
    EditEmployee,
    EmployeeList,
    Home,
    Register,
    Profile,
    ReviewAssign,
    ReviewForm,
    Login
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    PanelModule,
    CardModule,
    InputTextModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
