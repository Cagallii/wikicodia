import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TypeService } from '../services/type.service';
import Type from '../model/TypeArticle'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-type-mgmt',
  templateUrl: './admin-type-mgmt.component.html',
  styleUrls: ['./admin-type-mgmt.component.css']
})
export class AdminTypeMgmtComponent implements OnInit {

  types: Observable<Type[]>;

  constructor(private typeService: TypeService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.types = this.typeService.getAll();
  }

  addType(){
    this.router.navigate(['/types/creation']);
  }

  deleteType(id: number) {
    this.typeService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
