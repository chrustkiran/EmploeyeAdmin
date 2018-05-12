import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule} from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ChartModule } from 'angular-highcharts';

import { RouterModule, Routes } from '@angular/router';
import { PerformanceComponent } from './performance/performance.component';

import { FormsModule }   from '@angular/forms';


import{LoginService } from './login.service';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './map/map.component';

import{AuthguardService} from './authguard.service';
import { AgmCoreModule } from '@agm/core';
import { TaskComponent } from './task/task.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
{path: 'app' , component: AppComponent},
{ path: 'performance', component: PerformanceComponent },
{path: 'map' , component: MapComponent },
{path: 'login' , component: LoginComponent},
{path: 'task' , component: TaskComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerformanceComponent,
    NavigationComponent,
    MapComponent,
    TaskComponent,


  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzJJb8rm5gFr3oBSXwJpOPzhRd2QeRVik'
    }),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    ChartModule

  ],


  providers: [LoginService,AuthguardService],
  bootstrap: [AppComponent]
})





export class AppModule {


}
