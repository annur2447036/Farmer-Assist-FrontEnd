import { Component, OnInit } from '@angular/core';
import { CategoryService, ICategory } from '../../../Services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: ICategory[] = [];

  newCategory: ICategory = {
    name: '',
    imageurl: ''
  };

  isEdit = false;
  imagePreview: string | null = null;

  success = '';
  error = '';

  constructor(private category: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // ✅ IMAGE SELECT (BASE64)
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.newCategory.imageurl = reader.result as string;
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // ✅ LOAD
  loadCategories() {
    this.category.getAll().subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.categories = res;
      },
      error: (err) => {
        console.error("Error fetching Categories", err);
      }
    });
  }

  // ✅ ADD
  saveCategory() {
    this.category.add(this.newCategory).subscribe({
      next: () => {
        this.success = 'Category added successfully';
        this.loadCategories();
        this.resetForm();
      },
      error: (err: any) => {
        this.error = err.error || err.message;
      }
    });
  }

  // ✅ EDIT CLICK
  editCategory(c: ICategory) {
    this.isEdit = true;
    this.newCategory = { ...c };
    this.imagePreview = c.imageurl;
  }

  // ✅ UPDATE
  updateCategory() {
    if (!this.newCategory.id) return;

    this.category.update(this.newCategory.id, this.newCategory).subscribe({
      next: () => {
        this.success = 'Category updated successfully';
        this.loadCategories();
        this.resetForm();
      },
      error: (err: any) => {
        this.error = err.error || err.message;
      }
    });
  }

  // ✅ DELETE
  deleteCategory(id: number | undefined) {
    if (!id) return;
    if (!confirm('Are you sure to delete?')) return;

    this.category.delete(id).subscribe({
      next: () => {
        this.success = 'Category deleted successfully';
        this.loadCategories();
      },
      error: (err: any) => {
        this.error = err.error || err.message || 'Failed to delete';
      }
    });
  }

  // ✅ RESET
  resetForm() {
    this.isEdit = false;
    this.newCategory = { name: '', imageurl: '' };
    this.imagePreview = null;
  }
}