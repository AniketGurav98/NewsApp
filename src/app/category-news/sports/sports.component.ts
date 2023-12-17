import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalserviceService } from '../../globalservice.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  sportsNews:any[]=[]

  currentPage: number = 1; // Initial page




  constructor(private router: Router, private http: HttpClient, private api: GlobalserviceService) { }

  ngOnInit(): void {

    this.loadSportsNews()
  }

  loadSportsNews(){
    const apiUrl = this.api.getRouterUrl();
    this.http.post(`${apiUrl}/${'getArticleByCategory'}?page=${this.currentPage}`,{myCategory: "Sports"} ).subscribe((res:any) => {
      console.log(res,"polii");

      this.sportsNews = res

    })

  }


  nextPage() {
    this.currentPage++;
    this.loadSportsNews();
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadSportsNews();
    }
}

detailArticle(e:any){
  console.log(e,"*********************");

  this.router.navigate(['/detail', e]);
}


}