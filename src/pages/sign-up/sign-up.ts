import { UserHomePage } from './../user-home/user-home';
import { HomePage } from './../home/home';
import { Component} from '@angular/core';
import { NavController, NavParams,ToastController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireDatabase } from 'angularfire2/database';
import { SignInPage } from './../sign-in/sign-in'
import { FacebookPage } from '../facebook/facebook';


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  restaurantsList = [];
  usersList = [];
  restName; 
  name ;
  email ;
  password ;
  itemsRef;
  phone;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angularFireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private fb: Facebook,
    private toast: ToastController,
    public menu: MenuController
    ) {}

  ionViewDidEnter() {
    this.menu.enable(false);
  }
  ionViewWillLeave() {
    // to enable menu.
    this.menu.enable(true);
  }
  ionViewWillEnter() {
    // this.menu.enable(true, "menu");
    // when the page is ready
    // get the restaurants from the database 
    this.db.list('/restaurants').valueChanges().subscribe( data => {
      if (this.restaurantsList.length === 0) {
        for (var i = 0; i < data.length; i++) {
          this.restaurantsList.push([data[i]['name'],data[i]['email']]);
        }
      }
    })
    
    // get the users from the database
    this.db.list('/Users').valueChanges().subscribe( data => {
      if (this.usersList.length === 0) {
        for (var i = 0; i < data.length; i++) {
          this.usersList.push(data[i]['email']);
        }
      }
      
      // check if there's a user already signed in
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // if there, check if the user is a customer
          for(var i = 0; i < this.usersList.length; i++) {    
            if (user.email === this.usersList[i]) {
              // if yes, go the user home page
              this.navCtrl.setRoot(UserHomePage, {
                email: user.email
              });
            }
          }
          
          // if not a customer, check if he is a restaurant
          for (var i = 0; i < this.restaurantsList.length; i++) {
            if (user.email === this.restaurantsList[i][1]) {
              this.restName = this.restaurantsList[i][0];
              // if yes, go to the restaurant home page
              this.navCtrl.setRoot(HomePage, {
                restName: this.restName
              });
            }
          }
        } else {
            // No user is signed in.
          }
      });       
    });
  }

  fbLogin() {
    this.fb.login(['email'])
    .then((res) => {
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      this.navCtrl.setRoot(FacebookPage, {
        fc: fc
      });
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

  emailSignUp() {
    if (!this.name) {
      let toast = this.toast.create({
        message: 'You need to fill your name first',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    } else if (!this.phone){
      let toast = this.toast.create({
        message: 'You need to fill your phone first',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }
    // console.log(this.password)
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(signUpData=>{
      this.itemsRef = this.db.object('Users/' + this.phone);
      this.itemsRef.set({
        firstName: this.name,
        email: this.email,
        phone: this.phone,
        new: true
      });
      this.navCtrl.setRoot(UserHomePage, {
        email: this.email
      });
    }).catch(err => {
      this.toast.create({
        message: err.message,
        duration: 6000
      }).present();
    });
  }
  goToLogIn() {
    this.navCtrl.push(SignInPage);
  }
      
}
