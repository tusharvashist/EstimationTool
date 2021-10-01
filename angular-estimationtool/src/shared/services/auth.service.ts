import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }



  public login(userData: any) {
    let data = JSON.stringify(userData);
    this.setLocalStorage('auth', data);
  }

  public logout() {
    localStorage.removeItem('auth');
    return true;
  }

  public getToken() {
    let tokenData = this.getLocalStorage('auth');
    return '';
  }

  public setLocalStorage(name: string, data: any) {
    localStorage.setItem(name, data);
    return true;
  }

  public removeLocalStorage(name: string) {
    localStorage.removeItem(name);
    return true;
  }

  public getLocalStorage(name: string) {
    let data = localStorage.getItem(name);
    if (data != null)
      return JSON.parse(data);
    else
      return null;
  }




}
