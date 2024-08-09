import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Platform, PopoverController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class trackAPIService {

  fileTransfer: FileTransferObject = this.transfer.create();
  liveApiPath:any = 'https://connect.paj-gps.de/api/';

  authToken: string = localStorage.getItem('oauthtoken');

  public httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${this.authToken}`
    })
  };
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private transfer: FileTransfer,

  ) {
    this.authToken = localStorage.getItem('oauthtoken');
  }

  // user login
  async userLogin(postData) {
    try {
    const response = await this.http.post(`${this.liveApiPath}v1/login`,postData).toPromise();
    console.log(response);
    // return response;
    return {code:200,status:response['success']};
    } catch (error) {
      console.log(error);
      console.log(error['status']);
      console.log(error['error']['error']['emailError']);
      console.log(error['error']['error']['passwordError']);
      var errormsg = "";
      if(error['error']['error']['emailError'] == undefined){
        errormsg = error['error']['error']['passwordError'];
      }else{
        errormsg = error['error']['error']['emailError'];
      }
      return {code:400,status:errormsg};
      // return error;
    }

  }


  getdevice(): Observable<any> {
    const resp = this.http.get(`${this.liveApiPath}device`,this.httpOptions);
    return resp;
  }

  getTrackingData(id): Observable<any> {
    // https://connect.paj-gps.de/api/trackerdata/[DEVICE_ID]]/last_points?lastPoints=50
    //https://connect.paj-gps.de/api/v1/trackerdata/1283557/date_range?dateStart=1705573987&dateEnd=1717003529
    // const resp = this.http.get(`${this.liveApiPath}trackerdata/`+id+`/last_minutes?lastMinutes=5`,this.httpOptions);
    const resp = this.http.get(`${this.liveApiPath}trackerdata/`+id+`/date_range?dateStart=1705573987&dateEnd=1717003529`,this.httpOptions);
    return resp;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Alldevicelist(id): Observable<any> {
    // https://connect.paj-gps.de/api/trackerdata/[DEVICE_ID]]/last_points?lastPoints=50
    const resp = this.http.get(`${this.liveApiPath}trackerdata/`+id+`]/last_points?lastPoints=50`,this.httpOptions);
    return resp;
  }

}
