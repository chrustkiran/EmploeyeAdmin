import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    password : String;
    items: Observable<any[]>;
    itemsRef: AngularFireObject<any>;
    itemRef : AngularFireObject<any>;
    db:AngularFireDatabase;
    username :String;
    passwordTyped :String;
    router : Router;
    state:String;

    login_service : LoginService;
    constructor(db:AngularFireDatabase,router :Router , login_service : LoginService ) {
    this.login_service = login_service;
        this.db = db;
        this.router = router;
        this.itemsRef = this.db.list('admin');
        //this.itemsRef.set({state:"loggedin"});
        this.itemsRef.snapshotChanges(['child_changed'])
          .subscribe(actions => {
            actions.forEach(action => {
            if(action.key == "password"){
              console.log(action.payload.val());
              this.password = action.payload.val();
            }
            });
          });
      }

  ngOnInit() {
  }

  onSubmit(data){

    if(data.valid){
    this.username = data.value.email;
    this.passwordTyped= data.value.password;

  }
  if(this.password == this.passwordTyped){

    console.log("success");
    this.state = "success";
   this.login_service.changeState("loggedin");
   this.itemRef = this.db.object('admin');
   this.itemRef.update({state:"loggedin"});
   this.login_service.setUserLoggedIn();
    this.router.navigate(['/performance']);
  }
  else{
    console.log("noo");
    this.state = "Wrong password!!"
   this.login_service.changeState("loggedout");
   this.itemsRef.set({'state':"loggedin"});
  }
}
}
