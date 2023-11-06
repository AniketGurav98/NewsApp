import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit{

  articles: any[] = []; // Define a variable to store the retrieved articles
  imgSrc: any;
  mainImg: any;
  mainHeadline: any;
  mainArticle: any;
  mainImg1: any;
  mainHeadline1: any;
  mainArticle1: any;
  mainImg2: any;
  mainHeadline2: any;
  mainArticle2: any;
  mainImg3: any;
  mainHeadline3: any;
  mainArticle3: any;


  constructor(private http:HttpClient,private api :GlobalserviceService){}

  ngOnInit(): void {

    const apiUrl = this.api.getRouterUrl()
    this.http.get(`${apiUrl}/${'getArticles'}`).subscribe((res:any)=>{
      console.log(res,"reeeeeesssssssss");
      this.mainImg = res[0].img; 
      this.mainHeadline = res[0].headline; 
      this.mainArticle = res[0].article; 

      this.mainImg1 = res[1].img; 
      this.mainHeadline1 = res[1].headline; 
      this.mainArticle1 = res[1].article; 
      
      this.mainImg2= res[2].img; 
      this.mainHeadline2= res[2].headline; 
      this.mainArticle2= res[2].article; 
      
      this.mainImg3= res[3].img; 
      this.mainHeadline3= res[3].headline; 
      this.mainArticle3= res[3].article; 
      
    })
  }

}
