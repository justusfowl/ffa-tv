import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayService } from 'src/app/services/play.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {

  parentRouteId: number;
  private sub: any;
  displayItem : any; 

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    public playSrv : PlayService
  ) {
    
   }

  ngOnInit() {

    // Get parent ActivatedRoute of this route.
    this.sub = this.route.paramMap.subscribe((params : any) => {

      console.log(params.params.id)
      this.parentRouteId = params.params.id;

      console.log(this.playSrv.activeDisplay)
      this.displayItem = this.playSrv.activeDisplay;

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
