import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  messageLoading : string = "";
  globalMsgLoader : any;
  globalLoader : any;
  isMsgLoading : boolean = true;
  isLoading : boolean = false;

  constructor() { }

  
  setGlobalLoader(loaderRef){ 
      this.globalLoader = loaderRef;
  }

  setGlobalMsgLoader(loaderRef){
    this.globalMsgLoader = loaderRef;
  }

  setMsgLoading(targetState, msg?){

    if (!msg){
      msg = "";
    }
    if (targetState){
      this.isMsgLoading = true;
      this.messageLoading = msg;
    }else{
      this.isMsgLoading = false;
      this.messageLoading = msg;
    }
  }

  setLoading(targetState){
    this.isLoading = targetState;
  }

  setOnlineStatus(isOnline){
    /*
    if (isOnline){
      this.setMsgLoading(false);
    }else{
      this.setMsgLoading(true, "Es sieht aus, als wäre der Bildschirm nicht mit dem Server verbunden oder Offline.");
    }
    */
  }


  
}
