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

      if (!this.playSrv.activeDisplay){
        return;
      }

      if (this.playSrv.activeDisplay.type.type == 'clock'){
        this.displayItem = this.playSrv.activeDisplay;

        if (this.displayItem.clocks.length > 0){
  
          this.primaryClock = this.displayItem.clocks[0];
  
          if (this.displayItem.clocks.length > 1){
            let num = 0;
            this.displayItem.clocks.forEach(element => {
  
              if (num > 0){
                this.auxClocks.push(element);
              }
  
              num++;
            });
          }
  
        }
      }

    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
