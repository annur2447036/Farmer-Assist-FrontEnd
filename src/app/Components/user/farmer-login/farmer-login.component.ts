import { Component } from '@angular/core';
import { FarmerService } from '../../../Services/farmer.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ILogin } from '../../../Services/customer.service';

@Component({
  selector: 'app-farmer-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './farmer-login.component.html',
  styleUrl: './farmer-login.component.css'
})
export class FarmerLoginComponent {

    loginRequest:ILogin={
    email:'',
    password:''
  }
  message='';
  isLoading=false;
  
  constructor(private farmerservice :FarmerService, private router :Router){}
  
  login(){
    this.isLoading=true;
    debugger;
    this.farmerservice.login(this.loginRequest).subscribe({
      next:(res:any)=>{
        this.isLoading=false
        alert("login Success");
        localStorage.setItem("farmer",JSON.stringify(res));
        this.router.navigate(["/farmer/f-dashboard"]);
      },
      error:(err)=>{
          this.isLoading=false;
          this.message="Invalid username password";
          console.error("login failed",err);
        }
  
    })
  }
  }
  


