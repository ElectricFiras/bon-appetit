import { Component, ChangeDetectorRef} from '@angular/core';
import { NavController, NavParams, ToastController, MenuController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { UserHomePage } from '../user-home/user-home';
import { SignUpPage } from '../sign-up/sign-up';
import { FacebookPage } from '../facebook/facebook';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})

export class SignInPage {
  email ;
  password ;
  restName;
  restaurantsList = []; 
  usersList = [];
  EmailAuth=new firebase.auth.EmailAuthProvider();

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angularFireAuth: AngularFireAuth,
    public changeDetector: ChangeDetectorRef,
    private db: AngularFireDatabase,
    private toast: ToastController,
    private fb: Facebook,
    public menu: MenuController,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.db.list('/restaurants').valueChanges().subscribe( data => {
      if (this.restaurantsList.length === 0) {
        for (var i = 0; i < data.length; i++) {
          this.restaurantsList.push([data[i]['name'],data[i]['email']]);
        }
      }
        this.db.list('Users').valueChanges().subscribe( data => {
          if (data.length  > 0) {
            for (var i =0; i < data.length; i++) {
              this.usersList.push(data[i]['email']);
            }
         }
      });
    });
  }

  presentLoadingCrescent () {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Siging in, please wait',
      duration: 700
    });
    loading.present();
  }

  fbLogin() {
    this.fb.login(['email'])
    .then((res) => {
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(fc).then( fs => {
        for (var i = 0; i < this.restaurantsList.length; i++) {
          if (fs.email === this.restaurantsList[i][1]) {
            this.restName = this.restaurantsList[i][0];
            this.navCtrl.setRoot(HomePage, {
              restName: this.restName
            });
          }
        }

        for (var i = 0; i < this.usersList.length; i++) {
          if (fs.email === this.usersList[i]) {
            this.navCtrl.setRoot(UserHomePage, {
              email: fs.email
            });
          }
        }
        this.navCtrl.setRoot(FacebookPage, {
          fc: fc
        });  
      }).catch( ferr => {
        alert ('firebase err');
      });
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }
   
  emailSignIn(){
    if (!this.email){
      let toast = this.toast.create({
        message: 'You need to fill your email first',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    } else if (!this.password){
      let toast = this.toast.create({
        message: 'You need to fill your password first',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    this.angularFireAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(signedInData => {
      this.presentLoadingCrescent();
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

  signUp(){
    this.navCtrl.setRoot(SignUpPage);
  }
}