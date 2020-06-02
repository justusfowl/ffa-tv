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

  flagShowText : boolean = false;

  sub : any;
  displayItem : any; 
  mute : boolean = false;

  constructor(
    private playSrv : PlayService, 
    private route : ActivatedRoute
  ) {

   }

  ngOnInit() {

    // Get parent ActivatedRoute of this route.
    this.sub = this.route.paramMap.subscribe((params : any) => {

      if (!this.playSrv.activeDisplay){
        if (!this.playSrv.isInit){
          this.playSrv.goToHome();
        }
        return;
      }

      if (this.playSrv.activeDisplay.type.type == 'video'){
        this.displayItem = this.playSrv.activeDisplay;

        if (typeof(this.displayItem.mute) == "undefined"){
          this.mute = true;
        }else{
          this.mute = this.displayItem.mute;
        }

        console.log(this.mute);

        this.showText();
      }

    });

  }

  getBackgroundColor(){
    if (this.displayItem.backgroundColor){
      return this.displayItem.backgroundColor;
    }else{
      return "#fff";
    }
  }

  ngAfterViewInit(){
    // this.videoObj.nativeElement.play();
  }

  showText(){
    let self = this; 
    setTimeout(function(){
      self.flagShowText = true;
    }, 2000)
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
