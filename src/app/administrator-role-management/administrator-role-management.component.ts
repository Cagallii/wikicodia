import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import User from '../model/UserCreate';

@Component({
  selector: 'app-administrator-role-management',
  templateUrl: './administrator-role-management.component.html',
  styleUrls: ['./administrator-role-management.component.css']
})
export class AdministratorRoleManagementComponent implements OnInit {

  userToChange : any;
  isUserFound : boolean = false;
  isUserAdmin : boolean = false;

  constructor(
    private app: AppService
  ) { }

  ngOnInit() {
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

}
