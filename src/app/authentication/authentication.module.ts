import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  exports : [RouterModule]
})
export class AuthenticationModule { }
