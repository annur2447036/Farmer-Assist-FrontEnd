import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FarmerService, Ifarmer } from '../../../Services/farmer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-farmer-regsitration',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './farmer-regsitration.component.html',
  styleUrl: './farmer-regsitration.component.css'
})
export class FarmerRegsitrationComponent {

   farmer: Ifarmer = {
    address: '',
    contact: 0,
    email: '',
    name: '',
    password: '',
  };

  error: string = '';

  constructor(private service: FarmerService) {}

  registerFarmer() {
    this.service.regis(this.farmer).subscribe({
      next: () => {
        alert('Farmer Registered Successfully 🌿');
      },
      error: (err: { error: any; message: any; }) => {
        this.error = err.error || err.message || 'Registration Failed';
        console.log('Error while Register', err);
      }
    });
  }
}

