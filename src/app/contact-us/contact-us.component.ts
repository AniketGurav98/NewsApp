import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  
  contactForm ! : FormGroup;
  contactCard : boolean = true

  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private toaster :ToastrService
  ){

  }
  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(){
    this.contactForm = this.formBuilder.group({
      name : [''],
      email : ['',Validators.email],
      subject : [''],
      message : [''],
    })
  }

  submitForm() {
    let obj = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message
    };
  
    console.log(obj);

    this.http.post("http://localhost:3000/api/contact", obj).subscribe((res:any) => {
    if(res.success === true){
      this.toaster.success(res.message)
      this.contactForm.reset();
      
    }else{this.toaster.error(res.message)}
});

  

  }
}
