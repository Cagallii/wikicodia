import { Component, OnInit } from '@angular/core';
import Type from '../model/type';
import { TypeService } from '../services/type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {

  type: Type = new Type();
  submitted = false;

  constructor(private typeService: TypeService, private router: Router) { }

  ngOnInit() {
  }

  newType(): void {
    this.submitted = false;
    this.type = new Type();
  }

  save() {
    this.typeService.create(this.type)
      .subscribe(data => console.log(data), error => console.log(error));
    this.type = new Type();
    // this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/types/all']);
  }

}
