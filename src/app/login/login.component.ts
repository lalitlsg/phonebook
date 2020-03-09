import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token:any;
  isUserNotRegistered:boolean=false;
  userRegisteredSuccessfully:boolean=false;
  loginNotSuccessful:boolean=false;
 
  userLogin: FormGroup
  userRegister: FormGroup
  
  usernameReg = new FormControl('');
  passwordReg = new FormControl('');
  cnfPasswordReg = new FormControl('');

  password:any;
  confirmpassword:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:CommonService,
    private appState: StateService
  
  ) { 

    this.userLogin = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

    // this.userRegister = this.fb.group({
    //   username:['',Validators.required],
    //   password:['',Validators.required],
    //   confirmpassword:['',Validators.required]
    // })

  }

  ngOnInit() {
   
   
  }

  login(){
    const reqData = {
      username: this.userLogin.controls.username.value,
      password: this.userLogin.controls.password.value
    }
    this.service.loginService(reqData).subscribe(
      (resp) => {
        console.log("--status",resp)
        if(resp){
        this.token = resp.body
        // console.log("---------",this.token)
        this.appState.set('Token',this.token)
        this.appState.set('User',this.userLogin.controls.username.value)
        this.router.navigate(['dashboard'])
        }
        },
        err => {
          this.loginNotSuccessful = true
          console.log(err.status);
        }
    )
  }

  register(){
    this.isUserNotRegistered = true;
  }
  
  registerUser(){
    const reqData = {
      username: this.usernameReg.value,
      password: this.passwordReg.value,
      confirm_password: this.cnfPasswordReg.value
    }
    console.log(reqData)
    this.service.registerUser(reqData).subscribe(
      (data) => {
        this.userRegisteredSuccessfully = true
      }
    )
    this.isUserNotRegistered = false;
  }
}
