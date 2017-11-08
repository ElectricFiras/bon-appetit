import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-rest-reviews',
  templateUrl: 'rest-reviews.html',
})

export class RestReviewsPage {
  restInfo;
  reviews = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.restInfo = navParams.get('restInfo')
    console.log(this.restInfo.rating);
    console.log(this.restInfo.reviews);
    for (var key in this.restInfo.reviews) {
      this.reviews.push({email: this.restInfo.reviews[key].email, text: this.restInfo.reviews[key].review});
    }
    for (var k in this.restInfo.rating) {
      for (var ke in this.reviews){
        if (this.restInfo.rating[k].email === this.reviews[ke].email){
          this.reviews[ke]['rating'] = this.restInfo.rating[k].rating;
          break;  
        }
      }
    }
    console.log('reviews' , this.reviews , "====================");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestReviewsPage');
  }
}
