import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';

//  Camera
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

// Filetranfer
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

// Onesignal
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';

// Google plus
// import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HttpClient, Camera, FileTransfer,
    // OneSignal, GooglePlus
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
