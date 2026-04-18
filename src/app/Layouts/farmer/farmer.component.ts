import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-farmer',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './farmer.component.html',
  styleUrl: './farmer.component.css'
})
export class FarmerComponent {

constructor(private router :Router){}
  
logout(){
  localStorage.removeItem('farmer');
  this.router.navigate(['/']);
}


}
