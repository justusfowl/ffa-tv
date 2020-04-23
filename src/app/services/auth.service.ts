import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authObjectSubject: BehaviorSubject<any>;
  public authObject: Observable<any>;
  
  constructor(
    private router : Router
  ) {
    this.authObjectSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('authObject')));
    this.authObject = this.authObjectSubject.asObservable();
  }

  public get authObjectValue() {
    return this.authObjectSubject.value;
  }

  public get token(){

    let authObject = JSON.parse(localStorage.getItem('authObject'));

    if (authObject.token){
      return authObject.token;
    }else{
      return null;
    }

  }

  isAuthorized(){
    if (this.authObjectValue) {
        return true;
    }else{
        return false;
    }
  }

  handleLogin(authObjResponse){
    localStorage.setItem('authObject', JSON.stringify(authObjResponse));
    this.authObjectSubject.next(authObjResponse);
  }

  logout(){
    localStorage.removeItem('authObject');
    this.authObjectSubject.next(null);
    this.router.navigate(["/setup"], { replaceUrl: true });
  }



}
