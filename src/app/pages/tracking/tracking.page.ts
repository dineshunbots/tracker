import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trackAPIService } from 'src/app/services/track-api.service';
import * as maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
id:any;
list:any = [];
map: maplibregl.Map | undefined;
routeData: any[] = [];
  constructor(
    private router: Router,
    public myserv: trackAPIService,
  ) { }

  ngOnInit() {
    console.log("test");
    console.log(this.router.getCurrentNavigation());

    if (this.router.getCurrentNavigation().extras.state) {
      this.id = this.router.getCurrentNavigation().extras.state.deviceid;
    }
    this.loadMap();
  }

  logout(){
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
  loadMap() {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [50.50203, 6.803416666666667],
      zoom: 12,
    });

    this.map.on('load', () => {
      this.fetchAndDisplayRoute();
    });
  }

  fetchAndDisplayRoute() {
    const deviceId = this.id;
    this.myserv.getTrackingData(deviceId).subscribe(data => {
      this.routeData = data.success;
      this.displayRouteOnMap();
    });
  }

  displayRouteOnMap() {
    const coordinates: [number, number][] = this.routeData.map((point: any) => [point.lat, point.lng]);
    this.map?.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates,
        }
      }
    });

    // Add the polyline layer
    this.map?.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
                'line-width': 2,
                'line-color': '#007cbf'
            }
    });

    coordinates.forEach((coord, index) => {
      new maplibregl.Marker({ color: 'red' })
        .setLngLat(coord)
        .setPopup(new maplibregl.Popup().setText(`Point ${index + 1}`))
        .addTo(this.map!);
    });
  }

}
