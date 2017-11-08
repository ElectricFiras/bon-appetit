import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {

  restInfo;
  orders = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.restInfo = this.navParams.get('restInfo');
    
    for (var key in this.restInfo.orders){
      this.orders.push(this.restInfo.orders[key]);
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
  }

}
