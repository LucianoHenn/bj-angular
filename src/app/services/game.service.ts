import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private API_URL: string = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

    getAllCards(): Observable<Card[]> {
      return  this.http.get<Card[]>(this.API_URL+'cards');
    }

    init(): Observable<any> {
          return  this.http.get<any>(this.API_URL+'init');
   }

  resume(): Observable<Card[]> {
        return  this.http.get<any>(this.API_URL+'resume');
}


    play(): Observable<Card[]> {
      return  this.http.post<any>(this.API_URL+'play', {bet: 500});
    }

    hit(): Observable<Card[]> {
      return  this.http.get<Card[]>(this.API_URL+'hit');
    }

    stay(): Observable<any> {
      return  this.http.post<any>(this.API_URL+'stay', {});
    }

}
