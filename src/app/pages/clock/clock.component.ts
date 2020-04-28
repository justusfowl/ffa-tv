import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {

  sub : any;
  displayItem : any; 

  primaryClock: any; 
  auxClocks : any[] = [];

  constructor(
    private playSrv : PlayService, 
    private route : ActivatedRoute
  ) {

   }

  ngOnInit() {

    // Get parent ActivatedRoute of this route.
    this.sub = this.route.paramMap.subscribe((params : any) => {

      this.displayItem = this.playSrv.activeDisplay;

      if (this.displayItem.clocks.length > 0){

        this.primaryClock = this.displayItem.clocks[0];

        if (this.displayItem.clocks.length > 1){
          this.displayItem.clocks.forEach(element => {
            this.auxClocks.push(element);
          });
        }

      }

    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
