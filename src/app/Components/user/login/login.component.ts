import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService, ILogin } from '../../../Services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginRequest :ILogin={
    email:"",
    password:""

  }
  error="";
  
  constructor(private servic :CustomerService,private router:Router){
  }

  login(){
    this.servic.login(this.loginRequest).subscribe({
      next:( res:any)=>{
        alert("login successfully...!");
        localStorage.setItem("customer",JSON.stringify(res));
        this.router.navigate(["/customer/home"]);
      },
      error:(err)=>{
        alert("login failed... " + err.message ||err.error);
      }
    })
  }
  

}
