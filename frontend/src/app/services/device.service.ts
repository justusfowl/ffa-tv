import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private deviceObjectSubject: BehaviorSubject<any>;
  public deviceObject: Observable<any>;
  
  constructor(
  ) {
    this.deviceObjectSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('deviceObject')));
    this.deviceObject = this.deviceObjectSubject.asObservable();

    this.init();
  }

  
  public get deviceObjectValue() {
    return this.deviceObjectSubject.value;
  }

  public get deviceId() {
    return this.deviceObjectSubject.value.deviceId;
  }

  isInitialized(){
    if (this.deviceObjectValue) {
        return true;
    }else{
        return false;
    }
  }

  init(){

    if (!this.isInitialized()){
      let deviceInfo = {deviceId : uuid.v1({mac: true})}
      localStorage.setItem('deviceObject', JSON.stringify(deviceInfo));
      this.deviceObjectSubject.next(deviceInfo);

      console.log("initialize device with UUID: " + deviceInfo.deviceId);
    }else{
      console.log("load initialized device with UUID: " + this.deviceObjectValue.deviceId);
    }

  }

}
