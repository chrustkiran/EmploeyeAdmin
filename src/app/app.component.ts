import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'angular-highcharts';
import { Router } from '@angular/router';
import 'rxjs/add/observable/interval';

import {LoginService} from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  names: Observable<any[]>;
  itemRefs : AngularFireList<any>;
  keynames : Array<any> = [];
  values : Array<any> = [];
  chart : Chart;
  num: number = 0;
  state: String;


  constructor(db: AngularFireDatabase, router: Router, login : LoginService) {
    //  login.currentState.subscribe(state => this.state = state);
    this.state = login.state;
 // if(this.state != "loggedin"){
 //   router.navigateByUrl('/login');
 //  }
 console.log("state "+this.state);

// Observable.interval(3000).subscribe(x=>{
//   this.print_chart();
// });

  }






}
