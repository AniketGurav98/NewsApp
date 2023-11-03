import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  private apiUrl = "http://localhost:3000"
  constructor() { }

  getRouterUrl() {
    return `${this.apiUrl}/api`;
  }

  getImageUrl() {
    return `${this.apiUrl}`;
  }
  
}
