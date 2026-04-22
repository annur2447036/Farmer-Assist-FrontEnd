import { Component, OnInit } from '@angular/core';
import { CategoryService, ICategory } from '../../../Services/category.service';
import { IProduct, IProductDTO, ProductService } from '../../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ifarmer } from '../../../Services/farmer.service';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {

   products: IProduct[] = [];
  categories: ICategory[] = [];
  farmer!:Ifarmer;
  newProduct: any = this.getEmpatyProduct();
  imagePreview: string | null = null;

  isEdit = false;

  getEmpatyProduct() {
    return {
      name: '',
      price: 0,
      stock: 0,
      categoryId: 0,
      farmerId:0,
      imageurls: [],
      specifications: []
    }
  }

  constructor(private categoryService: CategoryService,
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    const store=localStorage.getItem("farmer");
    if(store){
      const farmerObj = JSON.parse(store);
      this.farmer = farmerObj;
    }
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        console.log("Categories from api", res);
        this.categories = res;
      },
      error: (err) => {
        console.error("error while fetching categories", err);
      }
    })
  }

  loadProducts() {
    if(this.farmer){
    this.ProductService.getByFarmerId(this.farmer.id!).subscribe({
      
      
      next: (res) => {
        console.log("Products from api", res);
        this.products = res;
      },
      error: (err) => {
        console.error("error while fetching products", err);
      }
    })
  }
  else{
    this.products=[];
  }
}

  onImageSelected(event: any) {
    const files = event.target.files;

    this.newProduct.imageurls = [];
    this.imagePreview = null;
    

    if (!files.length) return

    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.newProduct.imageurls.push(reader.result as string);

        if (!this.imagePreview) {
          this.imagePreview = reader.result as string
        }
      };
      reader.readAsDataURL(file);
    });
  }

  addSpecification(){
    this.newProduct.specifications.push({name:'',value:''});
  }

  removeSpecification(index:number){
    this.newProduct.specifications.splice(index,1);
  }

  addProduct(){

this.newProduct.farmerId = this.farmer?.id;

  if (!this.newProduct.farmerId) {
    alert('Farmer ID missing');
    return;
  }

  if (!this.newProduct.categoryId) {
    alert('Category ID missing');
    return;
  }


    console.log(this.newProduct);
    this.ProductService.add(this.newProduct).subscribe({
      next: ()=>{
        alert('Product Saved');
        this.resetForm();
        this.loadProducts();
        console.log();
        
      },
      error:err =>{ alert('Error '+ (err.error || err.message || JSON.stringify(err)));
        console.error(err);
      }


    })
  }

  editProduct(p:IProduct){
    this.isEdit = true;

    this.newProduct={
      name:p.product_name,
      price:p.price,
      stock:p.stock,
      available:p.available,
      categoryId:p.category?.id||0,
      farmerId:p.farmer?.id || 0,
      // imageurls:p.images?.[0].imageUrl || [],

      imageurls: p.images ? p.images.map(img => img.imageUrl) : [],
      specifications:p.specifications || [],
      id:p.id      
    }
  }

  updateProduct(){
    if(!this.newProduct.id) return;

    this.ProductService.update(this.newProduct.id,this.newProduct).subscribe({
     next:(res)=>{
        alert('Product Update');
        this.resetForm();
        this.loadProducts();
      },
      error:err => {alert('Error '+ (err.error || err.message || JSON.stringify(err))
        
    
    )
      
  }})
  }

  // 
  


  deleteProduct(id: number) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  console.log("Deleting ID:", id);

  this.ProductService.delete(id).subscribe({
    next: (res) => {
      alert('Product Deleted',);
      console.log(res);
      this.products = this.products.filter(p => p.id !== id);
      if (this.newProduct.id === id) {
        this.resetForm();
      }
    },
    error: (err) => {
      console.log("Delete error:", err);
      console.error(err);
      alert('Error: ' + (err.error || 'Delete failed'));
    }
  });
}

  resetForm(){
    this.isEdit=false;
    this.newProduct = this.getEmpatyProduct();
    this.imagePreview=null;
  }

}
