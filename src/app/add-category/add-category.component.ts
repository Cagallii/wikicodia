import { Component, OnInit } from '@angular/core';
import Category from '../model/Category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();
  submitted = false;

  constructor(private categoryService: CategoryService
    // , private router: Router
    ) { }

  ngOnInit() {
  }

  newCategory(): void {
    this.submitted = false;
    this.category = new Category();
  }

  save() {
    this.categoryService.create(this.category)
      .subscribe(data => console.log(data), error => console.log(error));
    this.category = new Category();
    // this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    // this.router.navigate(['/categories']);
  }

}
