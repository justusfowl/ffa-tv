import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { LoadingService } from './loading.service';
declare var RSSParser: any;

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  _playlists : any[] = [];
  _activePlaylist : any;
  
  _activeIdx : number = -1;
  _activeDisplay: any;

  private _init : boolean = false;
  private hasRun : boolean = false;

  private playTimer : any;

  private validComponents : any[] = [
    "clock", 
    "image", 
    "video", 
    "feed"
  ]

  constructor(
    private router : Router,
    private data : DataService, 
    private loadingSrv : LoadingService
  ) { 

    this.data.socket.fromEvent('device:playlist').subscribe(async (data : any) => {
      let self = this;

      this._init = true;

      this.playlists = data;
      if (data.length > 0){

        // as of now, only deploy the first playlist on the device
        this.activePlaylist = data[0];

        if (this.activePlaylist.items.length > 0){
          this.activeDisplay = this.activePlaylist.items[0];
        }

        await this.loadPlaylistItems().then(result => {
          this.play();
          self.loadingSrv.setMsgLoading(true, "Fertig!");
          setTimeout(function(){
            self.loadingSrv.setMsgLoading(false);
          }, 2000);
        }).catch(err => {
          console.error(err);
        });

        
      }
    });

  }

  initService(){
    if (!this._init){
      this.data.socket.emit('device:get-playlist');
    }
  }

  public navNext(){
    this.setNextItem();
    let compRoute;

    if (this.validComponents.indexOf(this.activeDisplay.type.type) > -1){
      compRoute = this.activeDisplay.type.type;
    }else{
      compRoute = "display"
    }

    this.router.navigate(["/" + compRoute + "/" + this.activePlaylist._id + "_" + this._activeIdx]);
  }

  setNextItem(){
    if (!this.hasRun){  
      // first round: 
      this._activeIdx = 0; 
      this.hasRun = true;
      
    }else{
      let newIdx
      if (this._activeIdx+1 == this.activePlaylist.items.length){
        newIdx = 0;
      }else{
        newIdx = this._activeIdx + 1;
      }

      this.activeDisplay = this.activePlaylist.items[newIdx];
    }
  }

  play(){

    let self = this;
    self.navNext();

    self.playTimer = setTimeout(function(){
     self.play();
    }, parseFloat(self.activeDisplay.duration)*1000);

  }

  pause(){
    if (this.playTimer){
      this.playTimer.pause();
    }
  }

  resume(){
    if (this.playTimer){
     this.playTimer.resume();
    }
    
  }

  clear(){
    if (this.playTimer){
      this.playTimer.clear()
      this.playTimer = null;
    }
  }

  public get playlists(){
    return this._playlists;
  }

  public set playlists(lists){
    this._playlists = lists;
  }

  public get activePlaylist(){
    return this._activePlaylist;
  }

  public set activePlaylist(list){
    this._activePlaylist = list;
  }

  public get activeDisplay(){
    return this._activeDisplay;
  }

  public set activeDisplay(item){
    let idx = this.activePlaylist.items.findIndex(x => x == item);
    this._activeIdx = idx;
    this._activeDisplay = item;
  }


  async getBase64FromUrl(imageUrl) {

    var res = await fetch(imageUrl);
    var blob = await res.blob();
  
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();

      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  async parseFeed(RSS_URL){
    let self = this;
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    let parser = new RSSParser();
    let feed = await parser.parseURL(CORS_PROXY + RSS_URL);
    
    

    if (!feed.origin){
      try{
        let origin = this.getDomainFromUrl(feed.link);
        feed["origin"] = origin;
      }catch(err){
        feed["origin"] = null;
      }
    }

    feed.items.forEach(element => {

      try{

        if (element.enclosure){
          if (element.enclosure.url){
            element["imageSrc"] = element.enclosure.url;
          }
        }else if (element.content){
          var doc = new DOMParser().parseFromString(element.content, "text/xml");
          let images = doc.getElementsByTagName("img");
    
          for (var i=0; i<images.length; i++){
            element["imageSrc"] = images[i].getAttribute("src");
          }
        }
       
      }catch(err){
        element["imageSrc"] = null;
      }
     
      try{
        let contentParsed = new DOMParser().parseFromString(element.content, "text/html");
        element["text"] = (contentParsed.children[0] as any).innerText;
      }catch(err){
        element["text"] = null;
      }  
      
      if (!element.date){
        let fields = Object.keys(element);
        let dateFieldIdx = fields.findIndex(x => x.toLowerCase().includes("date")); 

        if (dateFieldIdx > -1){
          element["date"] = new Date(element[fields[dateFieldIdx]]);
        }
      }

      
    });

    feed.activeIdx = 0;

    return feed;

  }

  getDomainFromUrl(url) {
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
  }

  loadPlaylistItems(){ 
    let self = this;
    return new Promise(async (resolve, reject) => { 
      try{

         const allItemPromises =  this.activePlaylist.items.map(async item => {
    
          if (item.type.type == 'image'){
            if (item.imageFullPath){
              item.imageFullPath = await self.getBase64FromUrl(item.imageFullPath);
            }
          }else if (item.type.type == 'video'){
            if (item.videoFullPath){
              item.videoFullPath = await self.getBase64FromUrl(item.videoFullPath);
            }
          }else if (item.type.type == 'feed'){
            if (item.RSSUrl){
              console.log(item.RSSUrl);
              item.feed = await self.parseFeed(item.RSSUrl);
            }else{
              console.error(new Error("No RSS Url defined"))
            }
            
          }

          return item
          
        });
        
        this.activePlaylist.items = await Promise.all(allItemPromises);

        resolve(true);

      }catch(err){
        reject(err);
      }
     
    })
  }

}
