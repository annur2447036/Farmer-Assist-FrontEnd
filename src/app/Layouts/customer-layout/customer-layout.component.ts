import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ICustomer } from '../../Services/customer.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink, FooterComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent implements OnInit {


  constructor(private router :Router){}

  customer :ICustomer |null=null;
  ngOnInit(): void {

    const store =localStorage.getItem('customer');
    this.customer=store ? JSON.parse(store):null;
    
  }

  logOut(){
    localStorage.removeItem('customer');
    this.router.navigate(['/']);
  }

}
