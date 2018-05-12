import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
itemRef : AngularFireObject<any>;
db:AngularFireDatabase;
router : Router;
  constructor(db: AngularFireDatabase , router:Router) {
      this.db = db;

 }

  ngOnInit() {
  }
  
  logout(){
  this.db.object('admin').update({state : "loggedout"});
   this.router.navigate(['']);

  }

}
