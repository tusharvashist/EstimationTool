import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  constructor(private userService: UserService) { }

  public user = {
    Username: '',
    Password: ''
  }

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
  ]);

  public inputFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
  }

  userlogin() {
    if (this.emailFormControl.valid && this.inputFormControl.valid) {
      
      this.userService.login(this.user).subscribe(
        (data) => {
          //sucess
          alert('User Logined');
        },
        (error) => {
          alert('User Name and Password are not valid');
        }
      )

    }
  }

}
