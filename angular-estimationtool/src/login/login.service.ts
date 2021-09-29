import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //Check Login
  public login(user: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', btoa(`${user.email}:${user.pass}`));
    return this.http.post(environment.apiURL, user, { headers: headers });
  }

  public isLoggedIn() {
    let tokenstr = localStorage.getItem('token');
    if (tokenstr != undefined || tokenstr == '' || tokenstr == null) {
      return false;
    }
    return true;
  }

  public setLoggedUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }
}
