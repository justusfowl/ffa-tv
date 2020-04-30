import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @ViewChild('videoObj', {static: true}) videoObj: ElementRef;

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

      if (this.playSrv.activeDisplay.type.type == 'video'){
        this.displayItem = this.playSrv.activeDisplay;
      }

    });

  }

  ngAfterViewInit(){
    // this.videoObj.nativeElement.play();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
