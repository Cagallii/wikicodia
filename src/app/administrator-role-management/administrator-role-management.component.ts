import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import User from "../model/UserCreate";
import { UserService } from "../services/user.service";
import {
  ActivatedRoute,
  Router,
} from "@angular/router";

@Component({
  selector: 'app-administrator-role-management',
  templateUrl: './administrator-role-management.component.html',
  styleUrls: ['./administrator-role-management.component.css']
})
export class AdministratorRoleManagementComponent implements OnInit {

  userToChange : any;
  isUserFound : boolean = false;
  isUserAdmin : boolean = false;
  autentificated: boolean = false;
  user: User = null;

  constructor(
    private app: AppService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.autentificated = this.app.authenticated;
    this.user = this.app.user;
    if (!this.app.authenticated) {
      this.router.navigateByUrl("/");
      }
  }

  findUser(mail : string){
    
    this.app.findUserByMail(mail).subscribe(
      response => {
        this.showUser(response);
      }
    );
    
  }

  showUser(user : any){
    this.userToChange = user;
    
    if(this.userToChange == null){
      this.isUserFound = false;
      document.getElementById('messages').innerHTML = "L'utilisateur n'a pas été trouvé";
    } else {
      document.getElementById('messages').innerHTML = "";
      this.isUserFound = true;
      this.displayButton();
    }
  }

  displayButton(){
    
    if(this.userToChange.role.role == "admin"){
      this.isUserAdmin = true;
      
    } else {
      this.isUserAdmin = false;
      
    }
  }

  upGrade(){
    this.app.userUpGrade(this.userToChange.role).subscribe(
      response =>
      {
        this.messageAfterUpdate(response);
      }
    );
  }

  downGrade(){
    this.app.userDownGrade(this.userToChange.role).subscribe(
      response =>
      {
        this.messageAfterUpdate(response);
      }
    );
  }

  messageAfterUpdate(response : any){
    this.isUserFound = false;
    document.getElementById('messages').innerHTML = "L'utilisateur est maintenant " + response.role;
  }

  cancel(){
    this.isUserFound = false;
  }
  
}
