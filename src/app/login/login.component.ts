import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalserviceService } from '../globalservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup

  constructor(
    private fb : FormBuilder,
    private http : HttpClient,
    private api : GlobalserviceService
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userID : ["",Validators.required],
      password : []
    })
  }

  submitLoginForm(){
    

    let obj = {
      userId : this.loginForm.value.userID,
      password : this.loginForm.value.password
    }
    
    const url = this.api.getRouterUrl()

    this.http.post(`${url}/login`,obj).subscribe((res:any)=>{
      console.log(res,"this is response");
      
    })
    
  }
  
}
