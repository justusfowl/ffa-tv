import { Component, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { DeviceService } from './services/device.service';
import { fader, slideInAnimation } from './route-animations';
import { PlayService } from './services/play.service';
import { LoadingService } from './services/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  animations : [fader],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  @ViewChild('globalLoader', {static: true}) public globalLoader: ElementRef;

  title = 'TV';

  constructor(
    private data : DataService, 
    private auth : AuthService,
    private router : Router, 
    private deviceService : DeviceService, 
    private playSrv : PlayService, 
    public loadingSrv : LoadingService
  ){
    
    this.data.initService();

    if (this.auth.isAuthorized()){
      // this.router.navigate(["/welcome"], { replaceUrl: true });
      this.playSrv.initService(); 
    }else{
      
      this.router.navigate(["/setup"], { replaceUrl: true });
    }

  }

  ngAfterViewInit(){

    this.loadingSrv.setGlobalLoader(this.globalLoader);   
    this.loadingSrv.setMsgLoading(true, "Bitte warten Sie, wir laden den Bildschirm");
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  navNext(){
    this.router.navigateByUrl("/image")
  }

  navNextService(){
    this.playSrv.navNext();
  }


}
