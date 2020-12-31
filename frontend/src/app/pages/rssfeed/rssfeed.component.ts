import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { ActivatedRoute } from '@angular/router';
import { WebcallsService } from 'src/app/services/webcalls.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var RSSParser: any;

@Component({
  selector: 'app-rssfeed',
  templateUrl: './rssfeed.component.html',
  styleUrls: ['./rssfeed.component.scss']
})
export class RssfeedComponent implements OnInit, AfterViewInit, OnDestroy {

  sub : any;
  displayItem : any; 

  DURATION_PER_ENTRY : number = 10000;

  feed : any;
  items : any[] = [];

  loopInterval : any;

  activeIdx : number = -1;
  topOffset : number = 0;

  constructor(
    private playSrv : PlayService, 
    private route : ActivatedRoute, 
    private webcalls : WebcallsService,
    private sanitizer: DomSanitizer
  ) {

   }

  ngOnInit() {

    this.sub = this.route.paramMap.subscribe((params : any) => {

      if (!this.playSrv.activeDisplay){
        if (!this.playSrv.isInit){
          this.playSrv.goToHome();
        }
        return;
      }

      this.displayItem = this.playSrv.activeDisplay;
      if (this.displayItem.feed){
        this.feed = this.displayItem.feed;
   
        if (this.feed.items){
          this.items = this.feed.items;
        }
   
        if (typeof(this.feed.activeIdx) == "undefined"){
         this.feed.activeIdx = 0;
        }
   
        this.activeIdx = this.feed.activeIdx;
   
       }
    });

  }

  ngAfterViewInit(){

    if (this.feed){

      if (this.activeIdx > 0){
        this.shiftUp(this.feed.activeIdx);
      }

      this.go();
    }
    
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
    clearInterval(this.loopInterval);
  }

  clearHtmlContent(content){
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  
  go(){
    let self = this;
    self.loopInterval = setInterval(function() {

     self.next();
      
    }, self.DURATION_PER_ENTRY);
  }

  next(){

    let self = this;
    let oldIdx = this.activeIdx;   
    let targetIdx;

    if (self.activeIdx+1 >= self.items.length){
      targetIdx = 0;
    }else{
      targetIdx = self.activeIdx + 1;   
    }

    this.activeIdx = -1;    

    setTimeout(function(){
      self.shiftUp(targetIdx);
    }, 200)
    
  }

  shiftUp(targetIdx){
    let self = this;
    let feedContainer = document.getElementById("feed-container");
    let newChild = feedContainer.children[targetIdx];
    let newScrollTargetTop = newChild.getClientRects()[0].top;
    
    feedContainer.style.webkitTransform = "translate(0px, -"+ Math.abs(newScrollTargetTop + Math.abs(feedContainer.getClientRects()[0].top)-40)+"px)";

    setTimeout(function(){
      self.activeIdx = targetIdx;
      self.feed.activeIdx = targetIdx;
    }, 500);
  }


  getIfTextEnds(text){
    if (text.substring(text.length-1, text.length) == "."){
      return "";
    }else{
      return "...";
    }
  }


}
