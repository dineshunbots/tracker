import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private route: Router,
    // private oneSignal: OneSignal,
    private platform: Platform,
    public alertController: AlertController,

  ) {
    // this.pageRedirect();
    this.platform.ready().then(() => {
      // this.setupPush();
      this.appClose();
    });
  }
  pageRedirect() {
    this.route.navigate(['login']);
  }

  appClose() {
    this.platform.backButton.subscribe(async () => {
      if (this.route.url === '/login' || this.route.url === '/') {
        const alert = await this.alertController.create({
          header: 'Close app?',
          mode: 'ios',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Close',
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });

        await alert.present();
      }
    });
  }


}
