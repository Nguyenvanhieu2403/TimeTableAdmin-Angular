import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './Login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PasswordModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
