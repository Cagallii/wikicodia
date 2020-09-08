import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryService } from '../services/category.service';
import Category from './../model/Category'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-category-mgmt',
  templateUrl: './admin-category-mgmt.component.html',
  styleUrls: ['./admin-category-mgmt.component.css']
})
export class AdminCategoryMgmtComponent implements OnInit {

  categories: Observable<Category[]>;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.categories = this.categoryService.getAll();
  }

  addCat(){
    this.router.navigate(['/categories/creation']);
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
