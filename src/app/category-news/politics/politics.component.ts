import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalserviceService } from 'src/app/globalservice.service';

@Component({
  selector: 'app-politics',
  templateUrl: './politics.component.html',
  styleUrls: ['./politics.component.css']
})
export class PoliticsComponent {

  politicsNews:any[]=[]

  currentPage: number = 1; // Initial page




  constructor(private router: Router, private http: HttpClient, private api: GlobalserviceService) { }

  ngOnInit(): void {

    this.loadPoliticsNews()
  }

  loadPoliticsNews(){
    const apiUrl = this.api.getRouterUrl();
    this.http.post(`${apiUrl}/${'getArticleByCategory'}?page=${this.currentPage}`,{myCategory: "Politics"} ).subscribe((res:any) => {
      console.log(res,"polii");

      this.politicsNews = res

    })

  }


  nextPage() {
    this.currentPage++;
    this.loadPoliticsNews();
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPoliticsNews();
    }
}

detailArticle(e:any){
  console.log(e,"*********************");

  this.router.navigate(['/detail', e]);
}

}
