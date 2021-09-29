import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  submitted = false;
  constructor(private userService: UserService, private router: Router, private snack: MatSnackBar) { }

  public user = {
    email: '',
    pass: ''
  }  

  ngOnInit(): void {
    //Check Auth

  }

  userlogin() {
    if (this.user.email.trim() == '' || this.user.pass.trim() == '') {
      this.snack.open("Username and Password is required?", '', { duration: 1000 });
      return;
    }


    this.userService.login(this.user).subscribe(
      (data) => {
        //sucess          
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.snack.open("Username and Password are not valid.", '', { duration: 1000 });
      }
    )


  }

}
