import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit, OnDestroy, AfterViewInit {

  setupObj: any;
  setupSubscription : any;

  isLoading : boolean = false;

  constructor(
    private deviceService : DeviceService, 
    private data : DataService, 
    private loadingSrv : LoadingService
  ) {

    this.setupSubscription = this.data.setupObjObservable.subscribe(result => {
      this.setupObj = result;
    });


   }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.loadingSrv.setMsgLoading(false);
  }

  ngOnDestroy(){
    this.setupSubscription.unsubscribe()
  }

  getPinChar(pin){

    try{
      if (pin){
        return pin.split('');
      }else{
        return null;
      }
      
    }catch(err){
      console.error(err);
      return [];
    }
  }



}
