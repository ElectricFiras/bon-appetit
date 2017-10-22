import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderPage } from '../order/order';

/**
 * Generated class for the RestMealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rest-meals',
  templateUrl: 'rest-meals.html',
})
export class RestMealsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestMealsPage');
  }
  order(){
  	this.navCtrl.push(OrderPage);
  }

}
