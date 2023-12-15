import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalserviceService } from '../globalservice.service';

import 'froala-editor/js/plugins.pkgd.min.js';  
import 'froala-editor/js/froala_editor.pkgd.min.js';  
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  imageSrc: string = ''; // To display the uploaded image
  imageUrl: File | null = null;
  formData: any
  
  options2 : object ={}
  content :any

  addArticle!: FormGroup

  selected:any

  categories:any[]=["Politics","Sports","Weather"]

  isUpdateMode: boolean = false; // Added variable to track update mode


  constructor(private api: GlobalserviceService, private http: HttpClient,private fb : FormBuilder,
    private toster : ToastrService , private router : Router ,private route : ActivatedRoute
    ) {}


  ngOnInit(): void {
    
    this.isUpdateMode = this.route.snapshot.paramMap.has('id');

    this.addArticle = this.fb.group({
      img : [''],
      article : [''],
      headline : [''],
      category : ['']
    })

    this.addArticle.value.category
    this.patchArticle()
  }

  submitArticle(){
    

    let obj = {
      img : this.imageSrc ,
      article : this.addArticle.value.article,
      category : this.addArticle.value.category,
      headline : this.addArticle.value.headline
    }

    console.log(obj);
    
    const apiUrl =  this.api.getRouterUrl()
    this.http.post(`${apiUrl}/${'addArticle'}`,obj).subscribe((res)=>{
      console.log(res,"[[[[[]]]]]");
      this.toster.success("Added")
      this.router.navigateByUrl("")
    })
  }



  uploadFile(event: any) {
    var img = (`${this.api.getImageUrl()}`)
    let imagePath: string; 
    this.imageUrl = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('file', this.imageUrl);
    const apiUrl = (`${this.api.getRouterUrl()}/${"upload"}/${"UploadImageInServer"}`)
    this.http.post(apiUrl, this.formData).subscribe((data: any) => {
      this.imageSrc = `${img}/${data.file.path}`;
    })
  }


  patchArticle() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID from URL:', id);
  
      const apiUrl = this.api.getRouterUrl();
  
      this.http.get(`${apiUrl}/detail/${id}`).subscribe((article: any) => {
        console.log(article, "^^^^^^");
  
        this.imageSrc = article.img;  
        this.addArticle.patchValue({
          headline: article.headline,
          category: article.category,
          article: article.article,
        });
      },
        (error) => {
          console.error('Error fetching article details:', error);
        }
      );
    });
  }

updateArticle() {
  const id = this.route.snapshot.paramMap.get('id');
  const apiUrl = this.api.getRouterUrl();

  let obj = {
    img: this.imageSrc,
    article: this.addArticle.value.article,
    category: this.addArticle.value.category,
    headline: this.addArticle.value.headline,
  };

  this.http.put(`${apiUrl}/update/${id}`, obj).subscribe(
    (response) => {
      console.log('Article updated successfully:', response);
    },
    (error) => {
      console.error('Error updating article:', error);
    }
  );
}


}
