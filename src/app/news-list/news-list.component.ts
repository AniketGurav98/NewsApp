import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  mainCategory: any;

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

  userId:any

  constructor(private http:HttpClient,private api :GlobalserviceService, private router : Router ,private toastr : ToastrService){
    this.api.getDatafromLogingForToken().subscribe((data) => {
      console.log(data,"poopopoppo");
      
      this.userId = data
    })
  }


  ngOnInit(): void {

    this.loadArticles();

    if(localStorage.getItem('detail')=== null){
      console.log("not empty");
      
    } else {console.log("empty");
    }
    // this.subscribeToNotifications()
   }

 
   totalPages:any
 
   loadArticles() {
    //  console.log(this.currentPage,"[[[");
     window.scroll(0,0)
     this.api.getArticles(this.currentPage).subscribe((data) => {
      console.log(data[0].category,"kkkkk");

      

     
      this.topArticles = data.slice(0, 4);
 
      this.otherArticles = data.slice(4);
  
      console.log('Top Articles:', this.topArticles);
      console.log('Other Articles:', this.otherArticles);
      if (this.topArticles && this.topArticles.length > 0) {
   
 
         this.mainImg = this.topArticles[0].img;
         this.mainHeadline = this.topArticles[0].headline;
         this.mainArticle = this.topArticles[0].article;
         this.id = this.topArticles[0]._id;
         this.mainCategory = this.topArticles[0].category
     
     
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
  
  detailArticle(e:any,category:any){
    console.log(category,"*********************");

    this.router.navigate(['/detail', e]);
  }

  editArticle(id:any){
    console.log(id,"IIIIIIIIIIIIII**********");
    this.router.navigate(['/add',{id}]);

  }

  deleteArticle(dltId:any) {
    console.log(dltId,"kKKKKKKKKKKk");

    
  const isConfirmed = confirm("Are you sure you want to delete this News");

  if (isConfirmed) {
    const apiUrl = this.api.getRouterUrl();

    this.http.delete(`${apiUrl}/articles/${dltId}`).subscribe(
      () => {
        console.log('Article deleted successfully');
        // Optionally, navigate to a different page after deletion
        // this.router.navigate(['']);
        this.ngOnInit()
      },
      (error) => {
        console.error('Error deleting article:', error);
      }
    )
  }
}




};



