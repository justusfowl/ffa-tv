import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { ActivatedRoute } from '@angular/router';
import * as uuid from 'uuid';
declare var Typed: any;

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit, AfterViewInit, OnDestroy {

  quoteContainerId : string = "";

  imageUrl : string = "../../assets/image/open_book.jpg";
  
  sub : any;
  displayItem : any; 

  constructor(    
    private playSrv : PlayService, 
    private route : ActivatedRoute
    ) { 
      let now = new Date();
      let id = "quote_" + now.getTime().toString();
      this.quoteContainerId = id;
    }

  ngOnInit() {

    let self = this;
     // Get parent ActivatedRoute of this route.
     this.sub = this.route.paramMap.subscribe((params : any) => {

      if (!this.playSrv.activeDisplay){
        if (!this.playSrv.isInit){
          this.playSrv.goToHome();
        }
        return;
      }

      if (this.playSrv.activeDisplay.type.type == 'quote'){

        this.displayItem = this.playSrv.activeDisplay;

        console.log(this.displayItem);

        if (!this.displayItem.quote){
          this.displayItem.quote = {
            "quote" : "Willkommen"
          }
        }
        setTimeout(function(){
          self.typeIt();
        }, 2000)
        
      }

    });


  }

  ngAfterViewInit(){

  }

  typeIt(){

    let that = this;

    var typed = new Typed("#" + this.quoteContainerId, {
      strings : ["&ldquo;" + this.displayItem.quote.quote + "&rdquo;"],
      typeSpeed: 50,
      backSpeed: 5,
      backDelay: 5000,
      startDelay: 1000,
      showCursor: false,
      loop: true
    });

  }

  prettyLog(in_string){
    console.log(in_string);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
