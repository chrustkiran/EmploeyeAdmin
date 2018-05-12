import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'angular-highcharts';
//import { LoginComponent } from '../login/login.component';
import { LoginService } from "../login.service";

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent{

  names: Observable<any[]>;
  itemRefs : AngularFireList<any>;
  keynames : Array<any> = [];
  values : Array<any> = [];
  chart : Chart;
  num: number = 0;
  state: String;


  constructor(db: AngularFireDatabase, login : LoginService) {



  //  login.currentState.subscribe(state => this.state = state);
login.checkLoggedIn();
  this.state = "non";
  this.state = login.state;
    console.log("performance "+this.state);
    this.itemRefs = db.list('performance');
    this.itemRefs.snapshotChanges()
  .subscribe(actions => {
    this.keynames = [];
    this.values = [];
    actions.forEach(action => {
    //  console.log(action.type)
      //console.log(action.key);
      console.log(this.num++);
      this.keynames.push(action.key);
      this.values.push(action.payload.val());
  this.print_chart();
      //keynames.push(action.key as string);
    });

  });


  // Observable.interval(3000).subscribe(x=>{
  //   this.print_chart();
  // });

  }

  print_chart(){

    this.chart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Performance Chart'
        },
        credits: {
          enabled: false
        },
        xAxis:{
          categories : this.keynames
        },

        series: [{
          name: 'Line 1',
          data: this.values
        }]
      });



  }

}
