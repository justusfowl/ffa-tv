import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('imageObj', {static: true}) imageObj: ElementRef;

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

    });

  }

  

  ngAfterViewInit(){
   
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
