import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PlayService } from 'src/app/services/play.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
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


}
