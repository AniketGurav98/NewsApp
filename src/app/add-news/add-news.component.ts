import { Component } from '@angular/core';
import 'froala-editor/js/plugins.pkgd.min.js';  
import 'froala-editor/js/froala_editor.pkgd.min.js';  
import { GlobalserviceService } from '../globalservice.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent {

  options2: Object = {}
  content :any

  imageSrc: any = ''
  imageUrl: File | null = null;
  formData: any;

  constructor(private api : GlobalserviceService,
    private http : HttpClient){}
  
  uploadFile(event: any) {
    var img = (`${this.api.getImageUrl()}`)
    this.imageUrl = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('file', this.imageUrl);
    const apiUrl = (`${this.api.getRouterUrl()}/${"UploadImageInServer"}`)
    this.http.post(apiUrl, this.formData).subscribe((data: any) => {
      this.imageSrc = img + '/' + data.file.path
    })
  }


}
