import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
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
  constructor(private loginService: LoginService, private router: Router, private snack: MatSnackBar, private fb: FormBuilder,private authService : AuthService) { }

  

  ngOnInit(): void {
    //Check Auth
    // if(this.loginService.isLoggedIn())
    // {
    //   this.router.navigate(['/dashboard']);
    // }
    // else
    // {
    // this.router.navigate(['/login']);
    // }
    
  }

  loginForm = this.fb.group({
    email: ['mukesh.chauhan@pyramidconsultinginc.com', Validators.required],
    pass: ['admin', Validators.required]
  });
  // loginHandel(arg) {
  //   if (this.user.email.trim() == '' || this.user.pass.trim() == '') {
  //     this.snack.open("Username and Password is required?", '', { duration: 1000 });
  //     return;
  //   }

    
  //   this.loginService.login(this.user).subscribe(
      
  //     (data: any) => {
  //       this.loginService.setLoggedUser(data.body.token);
  //       this.loginService.getuser().subscribe((data: any)=> {
  //         console.log(data);
  //       });
  //       //sucess          
  //       this.router.navigate(['/dashboard']);
  //     },
  //     (error) => {
  //       this.snack.open("Username and Password are not valid.", '', { duration: 1000 });
  //     }
  //   )


  // }
  redirectToDashbord=()=>{
    this.router.navigate(['/estimation']);
  }
  isError:boolean = false
isvalid=(loginData: any)=>{
  console.log(this.loginForm.valid);
  if(this.loginForm.valid){
  console.log('test');

    this.loginService.login(this.loginForm.value).subscribe((data: any) => {
            this.authService.login(data.body);
            console.log(data);
            this.redirectToDashbord();
        },(error) => {
          console.log(error);
            this.snack.open("Username and Password are not valid.", '', { duration: 1000 });
        }
    );
  }else{
    this.isError= true;
    setTimeout(()=>{
      this.isError= false;
    },1000)
  }
  
};

  loginHandel= (loginData:any)=>{
    
    this.isvalid(loginData);
    
  }

}
