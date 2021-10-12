import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public loaddashboard() {    
    let url=`${environment.apiURL}allestimation?skip=0&limit=5`;
    return this.http.get(url);
  }
}
