import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  submitted = false;
  constructor(private loginService: LoginService, private router: Router, private snack: MatSnackBar, private fb: FormBuilder, private authService: AuthService) { }



  ngOnInit(): void {
    //Check Auth
    if(this.authService.isLoggedIn())
    {
      this.redirectToDashbord();
    }
    else
    {
    this.router.navigate(['/login']);
    }
  }

  loginForm = this.fb.group({
    email: ['mukesh.chauhan@pyramidconsultinginc.com', Validators.required],
    pass: ['admin', Validators.required]
  });

  redirectToDashbord = () => {
    this.router.navigate(['/home']);
  }

  isError: boolean = false

  isvalid = (loginData: any) => {
   
    if (this.loginForm.valid) {


      this.loginService.login(this.loginForm.value).subscribe((data: any) => {
        this.authService.login(data.body);
       
        this.loginService.getuser().subscribe((user: any)=>{
          console.log(user);
        })
        this.redirectToDashbord();
      }, (error) => {
        
        this.snack.open("Username and Password are not valid.", '', { duration: 1000 });
      }
      );
    } else {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 1000)
    }

  };

  loginHandel = (loginData: any) => {
    this.isvalid(loginData);
  }

}
