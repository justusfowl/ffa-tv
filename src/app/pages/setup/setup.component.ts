import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { DataService } from 'src/app/services/data.service';

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
    private data : DataService
  ) {

    this.setupSubscription = this.data.setupObjObservable.subscribe(result => {
      this.setupObj = result;
    });


   }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    
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
