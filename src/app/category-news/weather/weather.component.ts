import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalserviceService } from 'src/app/globalservice.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weatherNews:any[]=[]

  currentPage: number = 1; // Initial page




  constructor(private router: Router, private http: HttpClient, private api: GlobalserviceService) { }

  ngOnInit(): void {

    this.loadWeatherNews()
  }

  loadWeatherNews(){
    const apiUrl = this.api.getRouterUrl();
    this.http.post(`${apiUrl}/${'getArticleByCategory'}?page=${this.currentPage}`,{myCategory: "Weather"} ).subscribe((res:any) => {
      console.log(res,"polii");

      this.weatherNews = res

    })

  }


  nextPage() {
    this.currentPage++;
    this.loadWeatherNews();
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadWeatherNews();
    }
}

detailArticle(e:any){
  console.log(e,"*********************");

  this.router.navigate(['/detail', e]);
}


}
