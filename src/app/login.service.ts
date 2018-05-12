import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import { Router } from '@angular/router';
@Injectable()
export class LoginService {

//  private stateSource = new BehaviorSubject<string>("loggedout");
  //  currentState = this.stateSource.asObservable();
state : String;
private isUserLoggedIn;
 public username;
 router : Router;
db : AngularFireDatabase;
itemRef : AngularFireList<any>;
    constructor(db:AngularFireDatabase , router:Router) {
      this.db = db;
    this.state = "loggedout";
    this.isUserLoggedIn = false;
    this.router = router;

  }

    changeState(state: string) {
      //this.stateSource.next(state);
      this.state = state;
    }

    setUserLoggedIn() {
  this.isUserLoggedIn = true;
  this.username = 'admin';
}

getUserLoggedIn() {
  return this.isUserLoggedIn;
}
checkLoggedIn(){
  this.itemRef =  this.db.list('admin');
  this.itemRef.snapshotChanges(['child_changed'])
    .subscribe(actions => {
      actions.forEach(action => {
      if(action.key == "state"){
      //  console.log(action.payload.val());
        if(action.payload.val()=="loggedout"){
        this.router.navigate(['/login']);
      }
      }
      });
    });
}



}
