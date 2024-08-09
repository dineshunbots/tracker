import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { trackAPIService } from '../services/track-api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

events: any;
products:any;
imagepath:any = 'https://connect.paj-gps.de/';




  constructor(
    private router: Router,
    public myserv: trackAPIService,

  ) {

  }
  ngOnInit(): void {
    this.Alldevice();
  }

  myclick(id) {
    console.log(id);

    const navigationExtras: NavigationExtras = {
      state: {
        deviceid: id
      },
    };
    console.log(navigationExtras);
    this.router.navigate(['/trackingdata'], navigationExtras);

   }


   // eslint-disable-next-line @typescript-eslint/naming-convention
   Alldevice(){
    this.myserv.getdevice().subscribe((resp) => {
      console.log(resp.headers);
      console.log(resp);
      this.events = resp.success;
     });
   }

  logout(){
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }


}
