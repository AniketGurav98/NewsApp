import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalserviceService } from '../globalservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup
  otpForm!: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;

  constructor(
    private fb : FormBuilder,
    private http : HttpClient,
    private api : GlobalserviceService,
    private router : Router,
    private toaster: ToastrService,

  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  submitLoginForm(): void {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.http.post<any>('http://localhost:3000/api/login', userData).subscribe(
        (response) => {
          console.log('******', response);

          if (response.success) {
            this.otpSent = true;
            localStorage.setItem('detail', response.userId)

          } else {
            this.toaster.error(response.message)

          }
        },
        (error) => {
          this.toaster.error("please check user creadential", error);
        }
      );
    }
  }

  verifyOTP(): void {
    if (this.otpForm.valid) {
      const enteredOTP = this.otpForm.value.otp;
      const userId = this.loginForm.value.userId;

      this.http.post<any>('http://localhost:3000/api/verifyOTP', { userId, enteredOTP }).subscribe(
        (response) => {
          console.log(response, "&&&&&&&");

          if (response.success) {
            this.otpVerified = true;
            this.api.getToken(response.token)
            setTimeout(() => {
              this.router.navigate(['']);
            }, 1000);

          } else {
            this.toaster.error(response.message)

          }
        },
        (error) => {
          this.toaster.error(error);
        }
      );
    }
  }
  
}
