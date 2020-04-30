import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class WebcallsService {


  loading : boolean = false;

  constructor(
    private http: HttpClient, 
    private loadingSrv : LoadingService
  ) { }

  get(url, paramOptions?, enableLoader=true){  

    this.loading = true;
    if (enableLoader){
      this.setLoading(true);
    }
    
    const api = this;

    return new Promise(function(resolve, reject) {
      
      api.http.get(url, {params: paramOptions}).subscribe(
        (data: any) => {
          
          api.loading = false;

          if (enableLoader){
            setTimeout(function(){
              api.setLoading(false);
            },500)
          }

          resolve(data)
        },
        error => {
          api.loading = false;
          api.handleAPIError(error);
          reject(error)
        }
      )
    });
  }

  setLoading(targetState){
    this.loadingSrv.setLoading(targetState);
  }

      
  handleAPIError(error){
    if (!error.flagHasActionHappened){
      console.error(error);
    }
  }

}
