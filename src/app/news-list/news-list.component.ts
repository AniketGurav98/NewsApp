import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit{

  topArticles: any[] = []; // Define a variable to store the retrieved articles
  otherArticles : any = []
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

  id: any;
  id1: any;
  id2: any;
  id3: any;

  currentPage: number = 1; // Initial page
  itemsPerPage: number = 10; // Define the number of items to return per page

  totalArticles: any

  constructor(private http:HttpClient,private api :GlobalserviceService, private router : Router){}


  ngOnInit(): void {

    this.loadArticles()
   }
 
   totalPages:any
 
   loadArticles() {
    //  console.log(this.currentPage,"[[[");
     window.scroll(0,0)
     this.api.getArticles(this.currentPage).subscribe((data) => {
      console.log(data,"kkkkk");

      

     
      this.topArticles = data.slice(0, 4);
 
      this.otherArticles = data.slice(4);
  
      console.log('Top Articles:', this.topArticles);
      console.log('Other Articles:', this.otherArticles);
      if (this.topArticles && this.topArticles.length > 0) {
   
 
         this.mainImg = this.topArticles[0].img;
         this.mainHeadline = this.topArticles[0].headline;
         this.mainArticle = this.topArticles[0].article;
         this.id = this.topArticles[0]._id;
     
     
         if (this.topArticles[1]) {
           this.mainImg1 = this.topArticles[1].img;
           this.mainHeadline1 = this.topArticles[1].headline;
           this.mainArticle1 = this.topArticles[1].article;
           this.id1 = this.topArticles[1]._id;
         }
     
         if(this.topArticles[2]) {
           this.mainImg2= this.topArticles[2].img; 
           this.mainHeadline2= this.topArticles[2].headline; 
           this.mainArticle2= this.topArticles[2].article;
           this.id2 = this.topArticles[2]._id; 
         }
         
         if(this.topArticles[3]){
             
           this.mainImg3= this.topArticles[3].img; 
           this.mainHeadline3= this.topArticles[3].headline; 
           this.mainArticle3= this.topArticles[3].article; 
           this.id3 = this.topArticles[3]._id; 
     
         }
        //  this.totalPages = this.calculateTotalPages(this.totalArticles, this.itemsPerPage);

        }
         
     
 
     
      
     });
   }

  //  calculateTotalPages(totalArticles: number, itemsPerPage: number): number {
  //   return Math.ceil(totalArticles / itemsPerPage);
  // }

  
 
   nextPage() {
     this.currentPage++;
     this.loadArticles();
   }
 
 
   prevPage() {
     if (this.currentPage > 1) {
       this.currentPage--;
       this.loadArticles();
     }
 }
  
  detailArticle(e:any){
    console.log(e,"*********************");

    this.router.navigate(['/detail', e]);
  }

}