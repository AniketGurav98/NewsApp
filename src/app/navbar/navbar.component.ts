import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  detail:any

  constructor(private globalService:GlobalserviceService){}
  
  ngOnInit(): void {

    this.detail = localStorage.getItem('detail')

    console.log(this.detail,"my detail"); 
   }

   logout() {
    this.globalService.getToken('logout');
    this.ngOnInit()
  }

  
}
