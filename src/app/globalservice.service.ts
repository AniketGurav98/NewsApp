import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  private apiUrl = "http://localhost:3000"

  private dataSubject = new BehaviorSubject<string>('');
  data$ = this.dataSubject.asObservable();
  



  constructor(private http :HttpClient) { }

  getRouterUrl() {
    return `${this.apiUrl}/api`;
  }

  getImageUrl() {
    return 'http://localhost:3000';
  }
  
  getArticles(page: number): Observable<any> {
    console.log(page,"9999");
    const url = `${this.apiUrl}/api/getArticles?page=${page}`;
    return this.http.get(url);
  }

  getToken(data:any){
   
    console.log(data,"my data");
    if(data === 'logout'){
      localStorage.clear();
      this.dataSubject.next('logout')
    }else{
      localStorage.setItem('token',data);
      this.dataSubject.next('login')
    }
    
  }

  
}
