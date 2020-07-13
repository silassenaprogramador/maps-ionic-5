import { Component } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';

declare var google : any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  @ViewChild('map',{read:ElementRef, static: false}) mapRef:ElementRef;
  mapa: any;
  infoWindows: any = [];
  markers:any = [
    {
      title:"National Art Gallery",
      latitude:"-17.819460",
      longitude:"31.053844"
    }
  ];

  constructor() {}

  ionViewDidEnter(){

    this.showMap();
  }

  addMarkersToMap(markers){

    for(let marker of markers){
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position:position,
        title:marker.title,
        latitude:marker.latitude,
        longitude:marker.longitude
      });
      mapMarker.setMap(this.mapa);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){

    let infoWindowsContent = `<div id='content'>
                                <h2 id='firstHeading' class="firsHeading">${marker.title}</h2>
                                <p>${marker.latitude}</p>
                                <p>${marker.longitude}</p>
                              </div>`;

    let infoWindow = new google.maps.InfoWindow({
      content:infoWindowsContent
    });

    marker.addListener('click',() =>{
      this.closeAllInfoWindows();
      infoWindow.open(this.mapa,marker);
    });
  }

  closeAllInfoWindows(){
    
    for(let window of this.infoWindows){
      window.close();
    }
  }

  showMap(){

    const location = new google.maps.LatLng(-17.824858,31.053028);
    const options = {
      center:location,
      zoom:15,
      disableDefaultUI:true
    }
    this.mapa = new google.maps.Map(this.mapRef.nativeElement,options);
    this.addMarkersToMap(this.markers);
  }

}
