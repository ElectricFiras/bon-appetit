import { SignUpPage } from './../pages/sign-up/sign-up';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule , } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Ionic2RatingModule } from 'ionic2-rating';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RestMealsPage } from '../pages/rest-meals/rest-meals';
import { RequestsPage } from '../pages/requests/requests';
import { MealsPage } from '../pages/meals/meals';
import { AboutPage } from '../pages/about/about';

import { DelivaryPage } from '../pages/delivary/delivary';
import { UserHomePage } from '../pages/user-home/user-home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { MapPage } from '../pages/map/map';
import { RestReviewsPage } from '../pages/rest-reviews/rest-reviews';
import { Facebook } from '@ionic-native/facebook';
import { FacebookPage } from '../pages/facebook/facebook';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Push } from '@ionic-native/push';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '68a0e532'
  }
};

var firebaseConfig = {
  apiKey: "AIzaSyBnH6BJVQHmst0wH2in3G4ftWxG2-m5r34",
  authDomain: "fireapp-14c15.firebaseapp.com",
  databaseURL: "https://fireapp-14c15.firebaseio.com",
  projectId: "fireapp-14c15",
  storageBucket: "fireapp-14c15.appspot.com",
  messagingSenderId: "374147991168"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RestMealsPage,
    RequestsPage,
    MealsPage,
    DelivaryPage,
    UserHomePage,
    SignInPage,
    MapPage,
    RestReviewsPage,
    SignUpPage,
    FacebookPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(RestMealsPage),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ionic2RatingModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RestMealsPage,
    RequestsPage,
    MealsPage,
    DelivaryPage,
    UserHomePage,
    SignInPage,
    MapPage,
    RestReviewsPage,
    SignUpPage,
    FacebookPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    Push
  ]
})

export class AppModule {}
