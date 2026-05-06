import { Component } from '@angular/core';
import { EnquiryModels, EnquiryService } from '../../../Services/enquiry.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent {

  constructor(private enquiryService: EnquiryService) {}

  save(enquiry: EnquiryModels) {

    this.enquiryService.submitEnquiry(enquiry).subscribe({
      next: () => {
        console.log("Enquiry Submitted...");

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Enquiry submitted successfully',
          timer: 2000,
          showConfirmButton: false
        });
      },

      error: (err) => {
        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to submit enquiry',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}