import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoryService, ICategory } from '../../../Services/category.service';
import { IProduct, IProductDTO, ProductService } from '../../../Services/product.service';
import { CartService, ICart } from '../../../Services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 categoriesList: ICategory[] = [];
  productList: IProduct[] = [];
  searchText: string = '';
   cartItem :ICart[]=[];

  constructor(
    private categories: CategoryService,
    private productservice: ProductService,
    private cartService: CartService,

  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
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

  loadProducts() {
    this.productservice.getAll().subscribe({
      next: (res) => {
        this.productList = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectCategory(c: ICategory) {
    this.productservice.getByCatId(c.id!).subscribe({
      next: (res) => {
        this.productList = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

  // // addToCart(p: IProduct) {
  // //   const item = {
  // //     productId: p.id,
  // //     quantity: 1
  // //   };

  // //   this.cartService.addToCart(item? :).subscribe({
  // //     next: () => {
  // //       alert('Added to cart');
  // //     },
  // //     error: (err) => {
  // //       console.log(err);
  // //     }
  // //   });
  // }

  // searchProducts() {
  //   if (!this.searchText.trim()) {
  //     this.loadProducts();
  //     return;
  //   }

  //   // this.productservice.search(this.searchText).subscribe({
  //   //   next: (res) => {
  //   //     this.productList = res;
  //   //   },
  //   //   error: (err) => {
  //   //     console.log(err);
    //   }
    // });
  

  


