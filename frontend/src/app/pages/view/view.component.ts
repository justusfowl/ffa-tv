import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PlayService } from 'src/app/services/play.service';
import { Router, RouterOutlet } from '@angular/router';
import { fader, slider, stepper } from 'src/app/route-animations';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: [ // <-- add your animations here
    // fader
    // slider
    // transformer,
    stepper
  ]
})
export class ViewComponent implements OnInit {

  constructor(
    private data : DataService, 
    private playSrv : PlayService, 
    private router: Router
  ) {
    
   }

  ngOnInit() {
    this.playSrv.initService();
  }

  nav(){
    this.playSrv.navNext();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
