import { Component, OnInit } from '@angular/core';
import{LoginService} from "../login.service";
import { AngularFireDatabase, AngularFireObject, AngularFireListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  db : AngularFireDatabase;
  router : Router;
  itemRefs : AngularFireListObservable<any[]>;
//  items: Array<any[]>;
  values : Observable<any[]>;
  items : any[];
  keys : Array<any> = [];
  names:any[];
  constructor(db : AngularFireDatabase , router: Router , login:LoginService) {
      this.db = db;
      this.router = router;
      login.checkLoggedIn();
      this.itemRefs = db.list('/tasks');
      this.items = this.itemRefs.snapshotChanges().map(changes => {
     return changes.map(c => ({ key: c.payload.key, val: Object.entries(c.payload.val()).map(([identy, value]) => ({identy, value}))  }));
   });
     this.names =(this.db.list("Users").valueChanges());


console.log(this.items);



   }




  ngOnInit() {
  }

}
