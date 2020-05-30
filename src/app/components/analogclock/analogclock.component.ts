import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import * as uuid from 'uuid';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'analog-clock',
  templateUrl: './analogclock.component.html',
  styleUrls: ['./analogclock.component.scss']
})
export class AnalogclockComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() timeZone : string = "Europe/Berlin";

  clock_id : any;
  m : any;
  location : string = ""; 
  timer : any;

  constructor() { 
    this.clock_id = uuid.v1();
  }

  ngOnInit() {

    this.location = this.timeZone.substring(this.timeZone.indexOf("/")+1, this.timeZone.length);
    this.location = this.location.replace(/_/g, " ");
    this.m = moment
   
    this.tick();

  }

  ngAfterViewInit(){
    this.setTime();
  }
  
  setTime(){
    let self = this;
    function r(el, deg) {
      el.setAttribute('transform', 'rotate('+ deg +' 50 50)')
    }

    var d = self.m().tz(self.timeZone);

    let hour = document.getElementById(self.clock_id + '_hour');
    let min = document.getElementById(self.clock_id + '_min');
    let sec = document.getElementById(self.clock_id + '_sec');
    
    r(sec, 6*d.second())  
    r(min, 6*d.minute())
    r(hour, 30*(d.hour()%12) + d.minute()/2)

  }

  
  tick(){
    let self = this;
    self.timer = setInterval(function() {

     self.setTime();
      
    }, 1000)

  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

}
