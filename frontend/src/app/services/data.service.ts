import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { DeviceService } from './device.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string = "";

  _setupObj : Subject<any>;
  _setup : any;

  public setupCompleted : boolean = false;

  constructor(
    public socket: Socket, 
    private _snackBar : MatSnackBar, 
    private auth : AuthService, 
    private deviceService : DeviceService, 
    private router : Router, 
    private loadingSrv : LoadingService
  ) {
    this.apiUrl = environment.apiProtocol + '://' + environment.apiBase + ':' + environment.apiPort + "/api/v" + environment.apiVersion;

    this._setupObj = new Subject<any>();

   }

   get setupObjObservable() {
    return this._setupObj.asObservable();
  }

  initService(){
    
    this.socket.fromEvent('loading').subscribe(data => {
      console.log("socket calls for loading..")
    });
     
    this.socket.fromEvent('hb').subscribe(data => {
      this._snackBar.open("Verbunden", "", { duration: 1500 });
    });

    this.socket.fromEvent('token:expired').subscribe(data => {
      this._snackBar.open("Token ist abgelaufen", "", { duration: 1500 });
      this.auth.logout();
    });

    this.socket.fromEvent('disconnect').subscribe(data => {
      console.log("disconnected");
      this.loadingSrv.setOnlineStatus(false);
    });

    this.socket.fromEvent('device:remove').subscribe(data => {
      this.setupCompleted = false;
      this.auth.logout();
      location.reload();   
    });

    this.socket.fromEvent('device:reload').subscribe((data : any) => {
      location.reload();  
    });

    // connect in setup-mode
    this.socket.fromEvent('connect').subscribe(data => {

      this.loadingSrv.setOnlineStatus(true);

      let body; 
      if (this.auth.isAuthorized()){
        console.log("### Connecting with token....###")
        body = { "token" : this.auth.token }
      }else{
        console.log("### Connecting in setup-mode....###")
        let deviceId = this.deviceService.deviceId;
        body = { "type" : "deviceSetup", "deviceId" : deviceId }
      }
      
      this.socket.emit('authentication', body);
    });

    this.socket.fromEvent('device:pin').subscribe((data : any) => {
      this._setupObj.next(data);
    });

    this.socket.fromEvent('device:successfully-added').subscribe((data : any) => {    
      this.auth.handleLogin(data);
      this._setupObj.next(data);
      this.loaderSuccess();  
    });
    
    this.socket.connect();
   }

   loaderSuccess(){

    this.setupCompleted = true;
    let self = this;

    setTimeout(function(){
     
      document.getElementsByClassName("checkmark")[0].classList.toggle("show");
      document.getElementsByClassName("success-message")[0].classList.toggle("show");
      document.getElementsByClassName("circle-loader")[0].classList.toggle("load-complete");
     
    }, 1500);

    setTimeout(function(){
      self.router.navigate(['/view']);
    }, 4000);

   }

}
