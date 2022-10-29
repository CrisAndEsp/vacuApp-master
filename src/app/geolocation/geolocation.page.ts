import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, ToastController, MenuController, NavParams } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

declare var google;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsService();

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  startPosition: any;
  originPosition: any;
  destinationPosition: any;
  

  constructor(
    private geolocation: Geolocation,
    public statusbar: StatusBar,
    public screen: SplashScreen,
    private ruta: ActivatedRoute,
    public toast: ToastController,
    public route: Router,
    public alertController: AlertController,
    public menu: MenuController
  ) {}

  ngOnInit(){
    this.initializeMapbox();
  }

  initializeMapbox(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc3Rpbm8tZXNwaW5vbGExNCIsImEiOiJja3Z1YWltdGkwNTUwMnZxbW9pbTg3bmtoIn0.Se6QziIBBZcbW2NVwYKenw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
      center: [-52.3355, -23.1313]
    });
  

  map.on('load', () =>{
    map.loadImage(
      '/assets/marker.png',
      (error, image) => {
        if(error) throw error;

        map.addImage('marker', image);

        map.addSource('point', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Hospital Distrital',
                  'description':
                  '<strong>Hospital Distrital - Hernandarias</strong><p>24 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6593, -25.3751]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'IPS - Hernandarias',
                  'description':
                  '<strong>IPS - Hernandarias</strong><p>24 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6377, -25.4082]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Hospital Regional CDE',
                  'description':
                  '<strong>Hospital Regional - Ciudad Del Este</strong><p>24 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6348, -25.5327]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'IPS - CDE',
                  'description':
                  '<strong>IPS - Ciudad Del Este</strong><p>24 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6239, -25.51182]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Ca´acupemi</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6457, -25.4170]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Santa Teresa</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6585, -25.3861]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Niño Jesus</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6299, -25.4006]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Las Mercedes</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6385, -25.4048]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Santa Ana</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6429, -25.4236]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Villa San Francisco</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6447, -25.4345]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Paso Ita</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.7179, -25.3812]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - San Ramon</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6425, -25.3953]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Maria Auxiliadora</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6527, -25.4157]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Km 8 Acaray</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6499, -25.4511]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Don Bosco 1</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6431, -25.4631]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Don Bosco</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6496, -25.4775]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Belen</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6364, -25.4868]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - San Agustin</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6149, -25.5001]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Jardín del Oriente</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.7325, -25.4746]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Bello Horizonte</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.7131, -25.4746]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Itaipu</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.7150, -25.4794]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Ciudad Nueva</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6701, -25.5234]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Dispensorio Médico',
                  'description':
                  '<strong>USF - Villa Nelida</strong><p>7 a 15 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.7546, -25.4754]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Hospital Distrital',
                  'description':
                  '<strong>Hospital Distrital - Minga Guazu</strong><p>24 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.7628, -25.4816]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'title': 'Hospital Distrital',
                  'description':
                  '<strong>Hospital Distrital - Presidente Franco</strong><p>24 horas</p>'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-54.6136, -25.5574]
                }
              },
            ]
          }
        });

        //agregar layer para usar imagenes para representar datos
        map.addLayer({
          'id': 'point',
          'type': 'symbol',
          'source': 'point', //data source
          'layout': {
            'icon-image': 'marker', //image
            'icon-size': 0.07,
            'icon-allow-overlap': true,
          }
        });

        map.on('click', 'point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180){
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360: -360;
          }

          new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseenter', 'point', () => {map.getCanvas().style.cursor = 'pointer';});
        map.on('mouseenter', 'point', () => {map.getCanvas().style.cursor = '';});
      }
    )
  })

  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }));

  map.addControl(new mapboxgl.NavigationControl({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }));

  this.geolocation.getCurrentPosition().then((response) => {
    this.startPosition = response.coords;
    map.setCenter([this.startPosition.longitude, this.startPosition.latitude]);

    var marker = new mapboxgl.Marker()
    .setLngLat([this.startPosition.longitude, this.startPosition.latitude])
    .addTo(map);
  })
  }

  initializeMap(){
    this.geolocation.getCurrentPosition()
    .then((res) => {
      this.startPosition = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
      const mapOptions = {
        zoom: 18,
        center: this.startPosition,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsDisplay.setMap(this.map);
    }).catch((err) => {
      console.log('Error', err);
    });
  }

  traceRoute(service:any, display:any, request:any){
    service.route(request, function(result, status){
      if(status == 'OK'){
        display.setDirections(result);
      }
    });
  }

  calculateRoute(){
    if(this.destinationPosition && this.startPosition){
      const request = {
        origin: this.startPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }
}
