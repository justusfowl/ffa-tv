import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { DeviceService } from './services/device.service';
import { fader } from './route-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  title = 'TV';

  constructor(
    private data : DataService, 
    private auth : AuthService,
    private router : Router, 
    private deviceService : DeviceService
  ){
    
    
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
   


    this.data.initService();

    if (this.auth.isAuthorized()){
      this.router.navigate(["/view"], { replaceUrl: true });
    }else{
      this.router.navigate(["/setup"], { replaceUrl: true });
    }

  }


}
