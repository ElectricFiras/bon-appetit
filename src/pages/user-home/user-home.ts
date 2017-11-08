import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestMealsPage } from '../rest-meals/rest-meals'
import { AngularFireDatabase } from 'angularfire2/database';
import { MapPage } from '../map/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignUpPage } from '../sign-up/sign-up';

@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html'
})
export class UserHomePage {
  resList;
  usersList = [];
  email;
  user;
  rating;
  raters;
  sort;
  isNew;
  slides = [
    {
      title: "How to order ?",
      description: "choose your favourite restuarant ..",
      image: "https://i.imgur.com/61v15nH.jpg",
    },
    {
      title: "How to order ?",
      description: "pick your favourite meal ..",
      image: "https://i.imgur.com/F6haW7S.jpg",
    },
    {
      title: "How to order ?",
      description: "choose a pickup method, then fill the information ..",
      image: "https://i.imgur.com/MohQa6R.jpg",
      
    },
    {
      title: "How to order ?",
      description: "you can also rate the restuarant to tell other users about your experience",
      image: "https://i.imgur.com/LDLEPZl.jpg",
    }
  ];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public afa: AngularFireAuth) {  }
  
  ionViewWillEnter () {
    this.db.list('/restaurants').valueChanges().subscribe(res => {
      this.resList = res;
    });

    this.db.list('/Users').valueChanges().subscribe( data => {
      if (this.usersList.length === 0) {
        for (var i = 0; i < data.length; i++) {
          this.usersList.push([data[i]['firstName'],data[i]['email'],data[i]['phone'],data[i]['new']]);
        }
      }
      this.email = this.navParams.get('email');
      for(var i = 0; i < this.usersList.length; i++) {      
        if (this.email === this.usersList[i][1]) {
          this.user = this.usersList[i];
          this.isNew = this.user[3];
        }
      }
    });
  }
 
  signOut() {
    this.afa.auth.signOut().then(res => this.navCtrl.setRoot(SignUpPage));
  }

  goToMealsPage(rest,user) {
    this.navCtrl.push(RestMealsPage, {
      rest: rest,
      user: {
        name: user[0],
        email: user[1],
        phone: user[2]
      }
    });
  }

  goToMapPage(rest){
    this.navCtrl.push(MapPage, {
      rest: rest
    });
  }

  getKeysNum (obj) {
    return Object.keys(obj).length;
  }

  getRating(name){
    var total = 0;
    for (var i = 0; i < this.resList.length; i++) {
      if (this.resList[i].name === name) {
        for (var key in this.resList[i]['rating']) {
          total += this.resList[i]['rating'][key].rating;
        }
      this.rating = total/Object.keys(this.resList[i]['rating']).length;
      this.raters = Object.keys(this.resList[i]['rating']).length;
      }
    }
    return this.rating.toFixed(1);
  }

  old() {
    this.db.object('/Users/'+ this.user[2]).set({
      firstName: this.user[0],
      email: this.user[1],
      phone: this.user[2],
      new: false
    });
    this.isNew = false;
  }

  sort1(){
    if(this.sort === "Name") {
      this.sortByName();
    }
    else if(this.sort === "Rating") {
      this.sortByRating();
    }
    console.log(this.sort);
  }

  sortByName() {
    this.resList.sort((a,b) => {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
    }
  });
} 

  sortByRating() {
    for(var i = 0; i < this.resList.length; i++) {
      this.resList[i]['rate'] = this.getRating(this.resList[i]['name']);
    }
    this.resList.sort((a,b) => b.rate - a.rate);
  }
}