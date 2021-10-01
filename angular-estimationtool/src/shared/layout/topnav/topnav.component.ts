import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor( private authService: AuthService,private router : Router) { }

  ngOnInit(): void {
  }

  logoutHandeler(){
    console.log("logout method called");
    this.authService.logout();  
    this.redirectToLogin();  
  }

  redirectToLogin=()=>{
    this.router.navigate(['/login']);
  }

}
