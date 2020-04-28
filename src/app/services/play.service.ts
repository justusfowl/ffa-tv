import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

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
    "video"
  ]

  constructor(
    private router : Router,
    private data : DataService
  ) {

    this.data.socket.fromEvent('device:playlist').subscribe((data : any) => {

      this._init = true;

      this.playlists = data;
      if (data.length > 0){

        // as of now, only deploy the first playlist on the device
        this.activePlaylist = data[0];

        if (this.activePlaylist.items.length > 0){
          this.activeDisplay = this.activePlaylist.items[0];
        }

       //  this.play();
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

    this.router.navigate(["view/" + compRoute + "/" + this.activePlaylist._id + "_" + this._activeIdx]);
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


}
