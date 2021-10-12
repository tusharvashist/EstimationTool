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

  public isLoggedIn() {
    let tokenstr = this.getToken();
    if (tokenstr == undefined || tokenstr == '' || tokenstr == null) {
      return false;
    }
    return true;
  }

  public getToken() {
    let tokenData = this.getLocalStorage('auth'); 
    if(tokenData != null)  
    return tokenData.token;
    else
    return null; 
  }

  private setLocalStorage(name: string, data: any) {
    localStorage.setItem(name, data);
    return true;
  }

  private removeLocalStorage(name: string) {
    localStorage.removeItem(name);
    return true;
  }

  private getLocalStorage(name: string) {
    let data = localStorage.getItem(name);
    if (data != null)
      return JSON.parse(data);
    else
      return null;
  }
}
