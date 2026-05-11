import { Component, OnInit } from '@angular/core';
import { CategoryService, ICategory } from '../../../Services/category.service';
import { IProduct, ProductService } from '../../../Services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,FormsModule,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
   categoriesList: ICategory[] = [];
    productList : IProduct[]  = [];
    selectedCategory!: ICategory;
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
    next: (res) => this.productList = res,
    error: (err) => console.log(err)
  });
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


