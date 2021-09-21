import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //Check Login
  public login(user: any) {
    return this.http.post(`https://jsonplaceholder.typicode.com/posts`, user);
  }
}
