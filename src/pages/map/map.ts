import { Component , ViewChild ,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition } from '@ionic-native/geolocation'; 
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';
import {Platform} from 'ionic-angular';
 
 
declare var google;
@Component({
 selector: 'page-map',
 templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  options : GeolocationOptions;
  currentPos : Geoposition;
  rest;

  constructor(public navCtrl: NavController, 
    private geolocation : Geolocation, 
    private googleMaps: GoogleMaps, 
    private platform: Platform, 
    public navParams: NavParams) {
        this.rest = this.navParams.get('rest');
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

   loadMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 19,
      center: {lat: this.rest.location.latitude , lng: this.rest.location.longitude}
    });

    var marker = new google.maps.Marker({
      position: {lat: this.rest.location.latitude , lng: this.rest.location.longitude},
      map: this.map,
      title: this.rest.name
    });
  }
}
