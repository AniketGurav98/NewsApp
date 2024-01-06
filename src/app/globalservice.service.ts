import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

import { AngularFireMessaging } from '@angular/fire/messaging';




@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  private apiUrl = "http://localhost:3000";
  private behaviorSubject = new BehaviorSubject<any>(null);
  private dataSubject = new BehaviorSubject<string>('');
  data$ = this.dataSubject.asObservable();
  currentMessage: any;
  afMessaging: any;

  constructor(private http: HttpClient, private router: Router ,private angularFireMessaging: AngularFireMessaging) {

    this.angularFireMessaging.messages.subscribe(
      (message:any) => {
        console.log('Message received. ', message);
        this.currentMessage.next(message);
      },
      (error:any) => {
        console.error('Error in receiving message. ', error);
      }
    );
   }

  getRouterUrl(): string {
    return `${this.apiUrl}/api`;
  }

  getImageUrl(): string {
    return 'http://localhost:3000';
  }

  getArticles(page: number): Observable<any> {
    const url = `${this.apiUrl}/api/getArticles?page=${page}`;
    return this.http.get(url);
  }

  getToken(data: string): void {
    if (data === 'logout') {
      localStorage.removeItem('token');
      this.dataSubject.next('logout');
    } else {
      localStorage.setItem('token', data);
      this.dataSubject.next('login');
    }
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token:any) => {
        console.log('Permission granted! Save to the server!', token);
        // Save the token to your server
      },
      (error:any) => {
        console.error(error);
      }
    );
  }

  receiveMessages() {
    this.afMessaging.messages.subscribe((message:any) => {
      console.log('Received message:', message);
      // Handle the received message
    });
  }
  

  credential : any

    // initializeFunforUserID() {
    //   const api = this.getRouterUrl();
    //   this.http.get(`${api}/check-cookies-token`, { withCredentials: true }).subscribe(
    //     (res: any) => {
    //       console.log('******** check-cookies-token ************', res);
    
    //       if (res.status === true) {
    //         console.log('dddddddd 0000000000000000 ddddd');
    //         this.credential = localStorage.getItem('detail')
    //         this.dataSubject.next(this.credential);

    //       }else{



    //       }
    //     },
    //     (error) => {
    //       console.error('Error in initializeFunforUserID:', error);
    //     }
    //   );
    // }
    

  setTokenName(data: any): void {
    const storedData: any = localStorage.getItem('detail');
    console.log(storedData, "aniiiiiiiiiiiiiniiiainiaina");

    // Use jwtDecode as a function
    const decodedToken = jwt_decode(data);
    var jsondata = JSON.stringify(decodedToken)
    var newdata = JSON.parse(jsondata)
    this.behaviorSubject.next(newdata);
    console.log(decodedToken, "Decoded Token");
  }

  getDatafromLogingForToken(): Observable<any> {
    return this.behaviorSubject.asObservable();
  }

  initializeFunforUserID() {
    const api = this.getRouterUrl()
    this.http.get(`${api}/check-cookies-token`, { withCredentials: true }).subscribe(
      (response: any) => {
        console.log('******** check-cookies-token ************', response)
        if (response.status === true) {
          const storedData: any = localStorage.getItem('token');
          const decodedToken = jwt_decode(storedData);
          console.log(decodedToken, "Decoded Token");
          var jsondata = JSON.stringify(decodedToken)
          var newdata = JSON.parse(jsondata)
          this.behaviorSubject.next(newdata);

          this.startTimer(storedData);
        } else {
          localStorage.removeItem('detail');
        }
      });
  }

  countdownMinutes: number = 0;
  countdownSeconds: number = 0;
  countdownInterval: any;

  startTimer(data: any): void {
    this.countdownMinutes = 285
    this.countdownSeconds = 0; // Set seconds to zero initially

    const timerCallback = () => {
      if (this.countdownMinutes === 0 && this.countdownSeconds === 0) {
        clearInterval(this.countdownInterval);
        console.log('Timer has ended!');
        this.refreshTokenUpdated(data).then((shouldRestart: any) => {
          if (shouldRestart.status === true) {
            // If refreshTokenUpdated returns true, start the timer again for 1 minute
            this.startTimer(shouldRestart.res);
          }
        }).catch((error) => {
          console.error('Error:', error);
        });
      } else {
        if (this.countdownSeconds === 0) {
          this.countdownMinutes--;
          this.countdownSeconds = 59;
        } else {
          this.countdownSeconds--;
        }
      }
    };

    this.countdownInterval = setInterval(timerCallback, 1000);
  }

  refreshTokenUpdated(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      var decoded: any = jwt_decode(data);
      var jsondata = JSON.stringify(decoded)
      var newdata = JSON.parse(jsondata)

      const api = this.getRouterUrl()

      this.http.post(`${api}/get-refresh-token`, newdata, { withCredentials: true }).subscribe(
        (response: any) => {
          if (response.status === 'tokenPresent') {
            localStorage.setItem("keyValue", response.token);
            resolve({ res: response.token, status: true });
          } else if (response.status === 'Logout') {
            localStorage.removeItem("keyValue");
            this.router.navigateByUrl("")
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            resolve(false);
          } else if (response.status === 'tokenExpired') {
            localStorage.removeItem("keyValue");
            this.router.navigateByUrl("")
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        },
        (error) => {
          console.error('Error in refreshTokenUpdated:', error);
          reject(error);
        }
      );
    });
  }


  

  
}
