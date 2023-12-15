import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalserviceService } from '../globalservice.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  sportsNews:any
  constructor(private router: Router, private http: HttpClient, private api: GlobalserviceService) { }

  ngOnInit(): void {

    const apiUrl = this.api.getRouterUrl();
    this.http.post(`${apiUrl}/${'getArticleByCategory'}`,{myCategory: "Sports"} ).subscribe((res) => {
      console.log(res);

      this.sportsNews = res

    })

  }

}