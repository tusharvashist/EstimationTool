import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //Check Login
  public login(user: any) {    
    let userstr=btoa(`${user.email}:${user.pass}`);    
    let headers = { 'Authorization': `Basic ${userstr}`};
    let url=`${environment.apiURL}user/login`;
    return this.http.post(url,'', { headers });
  }

  public getuser() {    
    let url=`${environment.apiURL}allestimation?skip=0&limit=5`;
    return this.http.get(url);
  }

  public isLoggedIn() {
    let tokenstr = localStorage.getItem('token');
    if (tokenstr == undefined || tokenstr == '' || tokenstr == null) {
      return false;
    }
    return true;
  }

 

 
}
