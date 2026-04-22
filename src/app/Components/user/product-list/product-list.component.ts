import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct, IProductDTO, ProductService } from '../../../Services/product.service';
import { RouterLink } from '@angular/router';
import { CategoryService, ICategory } from '../../../Services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {


  productList :ICategory[]=[];
  constructor(private categories :CategoryService){}
  ngOnInit(): void {
    this.loadProducts()
  }


  loadProducts(){
    this.categories.getAll().subscribe({

       next:(res)=>{
      this.productList=res;
           console.log(res);
       },
          error:(err)=>{
            console.log(err);
    }
  })
  }
  }
  
 
//  productList: IProduct[]=[];

//  constructor(private productServices :ProductService){}
//  ngOnInit(): void {
//    this.loadproducts();
//  }


//  loadproducts(){
//   this.productServices.getAll().subscribe({
//     next:(res)=>{
//       this.productList =res;
//         console.log(res);

//     },
//     error:(err)=>{
//       console.log(err);

//     }

//   })

// }


}
