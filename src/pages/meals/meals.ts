import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-meals',
  templateUrl: 'meals.html',
})
export class MealsPage {
i;
show= [];
meals= [];
nums = [1,2,3,4,5,6,7,8,9,10];
restName;
restInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.restName = this.navParams.get('restName');
    console.log(this.restName);
    
    this.db.list('/restaurants/'+ this.restName +'/available').valueChanges().subscribe( data => {
      console.log(data);
      console.log('=============================');
      this.show = data.reverse();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MealsPage');
  }

  addMeal(name, num) {
    if (this.show.length === 0){
      this.db.object('/restaurants/'+this.restName+'/available/'+name).set({
        name : name,
        quantity: Number(num)
      });
    } else {
      for (var i = 0; i < this.show.length; i++) {
      if (this.show[i].name === name) {
        num = Number(num) + this.show[i].quantity;
        this.db.object('/restaurants/'+this.restName+'/available/'+name).set({
          name : name,
          quantity: num
        });
      }
    }
    this.db.object('/restaurants/'+this.restName+'/available/'+name).set({
      name : name,
      quantity: Number(num)
    });
  }
}

removeMeal(name, num) {
  console.log(this.show);
  if (this.show.length === 0) {
    let alert = this.alertCtrl.create({
      title: 'Error !!',
      subTitle: "There's nothing to remove !",
      buttons: ['OK']
    });
    alert.present();
    } else {
      for (var i = 0; i < this.show.length; i++) {
        if (this.show[i].name === name && (this.show[i].quantity - Number(num)) >= 0) {
          console.log(typeof(this.show[i].quantity), '====================');
          num =this.show[i].quantity - Number(num);
          if(num === 0) {
            this.db.object('/restaurants/'+this.restName+'/available/'+name).remove();
            return;
          } else {
            this.db.object('/restaurants/'+this.restName+'/available/'+name).set({
              name : name,
              quantity: num
            });
            return;
          }
        } else if (this.show[i].name === name && (this.show[i].quantity - Number(num)) < 0) {
        let alert = this.alertCtrl.create({
          title: 'Error !!',
          subTitle: "You can only remove " + this.show[i].quantity + " meal(s)",
          buttons: ['OK']
        });
        alert.present();
        return;
      }
    }
    let alert = this.alertCtrl.create({
      title: 'Error !!',
      subTitle: "There's nothing to remove !",
      buttons: ['OK']
    });
    alert.present();
  }
}

  ionViewDidEnter() {
    this.db.list('/restaurants/'+this.restName+'/menu').valueChanges().subscribe( data => {
      console.log(data);
      console.log("%%%%%%%%%%%%%%%");
      this.meals = data;
    });
  }
}
