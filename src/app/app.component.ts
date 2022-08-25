import { Component, OnInit } from '@angular/core';
declare const L:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  inboundClick = true;
  title = 'Dummy_Location_Finder';
  
  ngOnInit(){
    var map = L.map('mapinit').setView([0,0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);
  }

  FindMyMap(){
    window.location.reload()
  }

  FindmyLocation(){
    this.inboundClick=false
    L.DomUtil.get('mapinit').remove()

    if(!navigator.geolocation){
      console.log("Location is not supported to this Device");
      alert("Device Specifications not Enough to Find Location")
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      var map = L.map('map').setView(latLong, 15);
        new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
        }).addTo(map);

        var marker = L.marker(latLong).addTo(map)

        marker.bindPopup('<b>My Current Position</b>').openPopup();

        let popup = L.popup()
        .setLatLng(latLong)
        .setContent("<span id='popup'><b>I am <i>here..</i></b></span>")
        .openOn(map);
    });
    this.watchPosition()
  }

  watchPosition(){
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      if(position.coords.latitude === desLat){
        navigator.geolocation.clearWatch(id);
      }
    },(err) => {
      console.log(err);
    },{
      enableHighAccuracy:true,
      timeout:5000,
      maximumAge: 0
    })
  }
}
