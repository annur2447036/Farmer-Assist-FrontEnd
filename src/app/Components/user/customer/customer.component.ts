import { Component } from '@angular/core';
import { CustomerService, ICustomer } from '../../../Services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customer: ICustomer = {
    address: '',
    city: '',
    contact: 0,
    email: '',
    name: '',
    password: '',
  };

  error: string = '';

  constructor(private service: CustomerService) {}

  registerCustomer() {
    this.service.register(this.customer).subscribe({
      next: () => {
        alert('Registered Successfully !!!!');
      },
      error: (err) => {
        this.error = err.error || err.message || 'Registration Failed';
        console.log('Error while Register', err);
      },
    });
  }
}


