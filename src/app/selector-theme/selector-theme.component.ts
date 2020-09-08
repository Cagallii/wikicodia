import { Component, OnInit, Output, EventEmitter,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-selector-theme',
  templateUrl: './selector-theme.component.html',
  styleUrls: ['./selector-theme.component.css']
})
export class SelectorThemeComponent implements OnInit {

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }


  onDarkModeSwitched({checked}:MatSlideToggleChange){
    this.darkModeSwitched.emit(checked);
    console.log("passage dans advancedsearchcomponent : onDarkModeSwitchedFromAdvancedSearch");
  }

}
