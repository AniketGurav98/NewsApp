import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GlobalserviceService } from '../globalservice.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
//   article: any;
//   articleList : any;
//   topArticle : any

//   constructor(private route : ActivatedRoute , private http : HttpClient , private api : GlobalserviceService){

//   }
//   ngOnInit(): void {
//     this.otherArticle()
//     const articleId = this.route.snapshot.paramMap.get('id');

//     console.log(articleId,"=====");

//     const apiUrl = this.api.getRouterUrl()

//     this.http.get(`${apiUrl}/detail/${articleId}`).subscribe((res)=>{
//       console.log(res,"^^^^^^");
//       this.article = res
//     })
    
//   }


//   otherArticle(){
//     const apiUrl = this.api.getRouterUrl()
//     this.http.get(`${apiUrl}/${'getArticles'}`).subscribe((res:any)=>{
//       this.articleList = res.otherArticles;
//       this.topArticle = res.topArticles
//       console.log("....",res);
      
//   })
// }

article: any;
articleList: any;
topArticle: any;
categories:any

constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private api: GlobalserviceService) {}

ngOnInit(): void {
  this.otherArticle();

console.log("iiiiii",this.route.snapshot.paramMap.get('id'));
  this.route.params.subscribe(params => {
    console.log(params,"ooooo");
    
    const articleId = params['id'];

    console.log(articleId, "=====");

    const apiUrl = this.api.getRouterUrl();

    this.http.get(`${apiUrl}/detail/${articleId}`).subscribe((res:any) => {
      console.log(res, "^^^^^^");
      this.article = res;
      this.categories = res.category
      console.log(this.categories,"MY Categories");

      this.category()
    });
  });

}

otherArticle() {
  const apiUrl = this.api.getRouterUrl();
  this.http.get(`${apiUrl}/${'getArticles'}`).subscribe((res: any) => {
    this.topArticle = res.slice(0,4);
    this.articleList = res.slice(4)
    console.log("....", res);
  });
}

// Updated method to navigate to the selected article
navigateToArticle(articleId: any) {
  this.router.navigate(['/detail', articleId]);
}

category(){
  const apiUrl = this.api.getRouterUrl();

  let myCategory = this.categories
  console.log(this.categories,"MY Categories");
  
  this.http.post(`${apiUrl}/${'getArticleByCategory'}`,{category: myCategory }).subscribe((res:any)=>{
    console.log(res,"bAni");
    
  })
}


}


