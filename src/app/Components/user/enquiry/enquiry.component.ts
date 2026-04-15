import { Component } from '@angular/core';
import { EnquiryModels, EnquiryService } from '../../../Services/enquiry.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent {
  constructor(private enquiryService :EnquiryService){

  }
  save(enquiry:EnquiryModels){
    this.enquiryService.submitEnquiry(enquiry).subscribe({
      next:()=>{
        console.log("Enquiry Submited...");
        alert("enquiry submmited successfully...");
      },
      error:(err)=>{
        console.log(err);
        alert("failed to subbmit");
      }

    })
  }

}


