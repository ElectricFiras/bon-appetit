import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestsPage } from '../requests/requests';
import { MealsPage } from '../meals/meals';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignInPage } from '../sign-in/sign-in';
import { RestReviewsPage } from '../rest-reviews/rest-reviews';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  restName;
  restInfo = {};
  avRating;
  raters;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth) {
    // this.restName = 'Jubran'
    this.restName = navParams.get('restName');
    this.db.list('/restaurants/').valueChanges().subscribe( data => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i]['name'] === this.restName) {
          this.restInfo = data[i];
        }
      }
      var total = 0;
      for (var key in this.restInfo['rating']) {
         total += this.restInfo['rating'][key].rating;
      }
      this.avRating = (total/Object.keys(this.restInfo['rating']).length).toFixed(1);
      this.raters = Object.keys(this.restInfo['rating']).length;
    });
  }

  googleLogout() {
    this.angularFireAuth.auth.signOut();
    console.log('logout from google');
    this.navCtrl.setRoot(SignInPage);
  }
  
  revPage() {
    this.navCtrl.push(RestReviewsPage, {
      restInfo: this.restInfo
    })
  }

  reqPage() {
    console.log("hi");
    this.navCtrl.push(RequestsPage, {
      restInfo: this.restInfo
    });
  };
  mealPage() {
    this.navCtrl.push(MealsPage, {
      restName: this.restName
    });
  }
}
