import { Component } from '@angular/core';
import{LoginService} from "../login.service";
import { AngularFireDatabase, AngularFireObject, AngularFireListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
    state : String;
    lat: number 6.78;
    lng: number = 79.88;
    db : AngularFireDatabase;
    itemRefs : AngularFireListObservable<any[]>;
    users : Array<any> = [];
    valRef : AngularFireList<any>;
    latArray : Array<any>;

  constructor(login: LoginService, db:AngularFireDatabase) {
        login.checkLoggedIn();
        this.db =db;
        this.checkUser();
        console.log(this.users);
        this.gettingLat();

   }
   markerIconUrl() {
            return require('./carblue.png');
        }
   checkUser(){
     this.itemRefs = this.db.list('current').valueChanges();
     // this.itemRefs.snapshotChanges(['child_changed']).
     //  subscribe(actions=>{
     //    actions.forEach(action =>{
     //        this.users.push(action.key.toString());
     //      //  console.log(action.key);
     //    });
     //  });
   }
   gettingLat(){
     for(let val in this.users){
      // console.log(val);
       this.valRef = this.db.list('current/'+val);
       this.valRef.snapshotChanges(['child_changed']).
          subscribe(actions=>{
            actions.forEach(action=>{
              console.log(action.key.toString());
              if(action.key =="lat"){
                this.latArray.push(action.payload.val());
                console.log(action.payload.val());
              }
            });
          });
     }
   }


}
