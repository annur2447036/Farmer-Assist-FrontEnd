import { Component } from '@angular/core';
import { AdminService, IAdmin } from '../../../Services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adim-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './adim-login.component.html',
  styleUrl: './adim-login.component.css'
})
export class AdimLoginComponent {
  loginRequest:IAdmin={
  username:'',
  password:''
}
message='';
isLoading=false;

constructor(private adminService :AdminService, private router :Router){}

login(){
  this.isLoading=true;
  this.adminService.login(this.loginRequest).subscribe({
    next:(res:any)=>{
      this.isLoading=false
      alert("login Success");
      localStorage.setItem("admin",JSON.stringify(res));
      this.router.navigate(["admin/dashboard"]);
    },
    error:(err)=>{
        this.isLoading=false;
        this.message="Invalid username password";
        console.error("login failed",err);
      }

  })
}
}
