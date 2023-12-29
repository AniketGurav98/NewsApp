import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId:any

  constructor(private globalService:GlobalserviceService, private http : HttpClient, private router : Router){
    this.globalService.getDatafromLogingForToken().subscribe((data) => {
      if (data && data.userId) {
        this.userId = data.userId;
      } else {
        // Handle the case where data or data.userId is null or undefined
        console.error('Data or data.userId is null or undefined');
        this.userId = ""
      }
    })
  }
  
  ngOnInit(): void {

    localStorage.getItem('detail')
     
   }

   logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("")
    setTimeout(() => {
      window.location.reload();
    }, 1000); // 2000 milliseconds = 2 seconds


  
}
}