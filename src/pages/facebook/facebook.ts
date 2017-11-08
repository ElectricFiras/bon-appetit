import { UserHomePage } from './../user-home/user-home';
import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-facebook',
  templateUrl: 'facebook.html',
})
export class FacebookPage {

  fc;
  phone;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angularFireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private fb: Facebook,
    private toast: ToastController) {
    this.fc = this.navParams.get('fc');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacebookPage');
  }

  signUp(){
    if (!this.phone) {
      let toast = this.toast.create({
        message: 'You need to fill your phone first',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    firebase.auth().signInWithCredential(this.fc).then(fs => {
      this.db.object('Users/' + this.phone).set({
        firstName: fs.displayName,
        email: fs.email,
        phone: this.phone,
        new: true
      });

      this.navCtrl.setRoot(UserHomePage, {
        email: fs.email
      });
    }).catch(ferr => {
      alert ('firebase err');
    });
  }
}
