import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { ActivatedRoute } from '@angular/router';
import * as uuid from 'uuid';
declare var Typed: any;


@Component({
  selector: 'app-bulletslide',
  templateUrl: './bulletslide.component.html',
  styleUrls: ['./bulletslide.component.scss']
})
export class BulletslideComponent implements OnInit {

  componentUUID : string;

  @ViewChild('imageObj', {static: true}) imageObj: ElementRef;

  flagShowText : boolean = false;

  sub : any;
  displayItem : any; 

  primaryClock: any; 
  auxClocks : any[] = [];

  typingInstances = [];

  constructor(
    private playSrv : PlayService, 
    private route : ActivatedRoute
  ) {

    this.componentUUID = new Date().getTime().toString();

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

      this.displayItem = JSON.parse(JSON.stringify(this.playSrv.activeDisplay));

      this.typingInstances.push({
        containerId : `title_${this.componentUUID}`, 
        text : this.displayItem.slide.title
      })

      for (var i=0; i<this.displayItem.slide.bullets.length;i++){
        this.typingInstances.push({
          containerId : `bullet_${this.componentUUID}_${i}`, 
          text : this.displayItem.slide.bullets[i].text
        })
      }

     

    });

  }

  typeIt(){
    let delay = 500;
    let delayIterator = 1500;
    let self = this;

    console.log(this.typingInstances);

    this.typingInstances.map(element => {
      self.type(element, delay);
      delay += delayIterator;
    });
  }

  type(element, delay){
    var typed = new Typed("#" + element.containerId, {
      strings : [element.text],
      typeSpeed: 50,
      backSpeed: 5,
      backDelay: 5000,
      startDelay: delay,
      showCursor: false
    });
    return typed;
  }

  getBackgroundColor(){
    if (this.displayItem.backgroundColor){
      return this.displayItem.backgroundColor;
    }else{
      return "#fff";
    }
  }

  ngAfterViewInit(){
    setTimeout(this.typeIt.bind(this), 3500);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
