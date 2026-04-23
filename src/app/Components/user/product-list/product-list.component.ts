import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct, IProductDTO, ProductService } from '../../../Services/product.service';
import { RouterLink } from '@angular/router';
import { CategoryService, ICategory } from '../../../Services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,FormsModule,JsonPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  categoriesList: ICategory[] = [];
  productList : IProduct[]  = [];
  constructor(private categories: CategoryService, private productservice :ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadproducts();
    
  }

  loadCategories() {
    this.categories.getAll().subscribe({
      next: (res) => {
        this.categoriesList = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadproducts(){
  this.productservice.getAll().subscribe({
    next:(res)=>{
    this.productList =res;
       console.log(res);

   },
   error:(err)=>{
      console.log(err);

    }

  })
}





  selectCategory(c: ICategory) {
  this.productservice.getByCatId(c.id!).subscribe({
    next:(res) => {
      this.productList=res;
      console.log(res); 
    },
     error: (err) => {
        console.log(err);
      }
  });

    
    console.log("Selected:", c);
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



