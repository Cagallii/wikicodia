import { Component, OnInit } from '@angular/core';
import Framework from '../model/Framework';
import { FrameworkService } from '../services/framework.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-framework',
  templateUrl: './add-framework.component.html',
  styleUrls: ['./add-framework.component.css']
})
export class AddFrameworkComponent implements OnInit {

  framework: Framework = new Framework();
  submitted = false;

  constructor(private frameworkService: FrameworkService
    // , private router: Router
    ) { }

  ngOnInit() {
  }

  newFramework(): void {
    this.submitted = false;
    this.framework = new Framework();
  }

  save() {
    this.frameworkService.create(this.framework)
      .subscribe(data => console.log(data), error => console.log(error));
    this.framework = new Framework();
    // this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    // this.router.navigate(['/frameworks']);
  }

}
