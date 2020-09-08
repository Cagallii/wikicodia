import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { FrameworkService } from '../services/framework.service';
import Framework from './../model/Framework'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-framework-mgmt',
  templateUrl: './admin-framework-mgmt.component.html',
  styleUrls: ['./admin-framework-mgmt.component.css']
})
export class AdminFrameworkMgmtComponent implements OnInit {

  frameworks: Observable<Framework[]>;

  constructor(private frameworkService: FrameworkService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.frameworks = this.frameworkService.getAll();
  }

  addFrk(){
    this.router.navigate(['/frameworks/creation']);
  }

  deleteFramework(id: number) {
    this.frameworkService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
