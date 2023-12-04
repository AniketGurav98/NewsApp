import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalserviceService } from '../globalservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-primary-user',
  templateUrl: './primary-user.component.html',
  styleUrls: ['./primary-user.component.css']
})
export class PrimaryUserComponent implements OnInit{

  registerForm! : FormGroup

  message: string = '';

  
  constructor(private formBuilder : FormBuilder,
    private api : GlobalserviceService,
    private http : HttpClient
    
    ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userId : [''],
      email : [''],
      mobile : [''],
      password : ['']
    })
  }

  registerUser(): void {
    
    let myObj = this.registerForm.value

    let apiUrl = this.api.getRouterUrl()

    this.http.post(`${apiUrl}/register`,myObj,{ withCredentials: true }).subscribe((response:any) => {
      console.log(response,"--------------");
      
        this.message = response.message;
      },
      error => {
        console.error('Error during registration:', error);
        this.message = 'Error during registration. Please try again.';
      }
    );
  }


}
