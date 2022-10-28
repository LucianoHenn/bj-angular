import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private RECURSO: string = 'orden';
  private API_URL: string = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

    getAllCards(token: any): Observable<Card[]> {
        const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
.set('Authorization', "Bearer " + token);
      return  this.http.get<Card[]>(this.API_URL+'cards', { 'headers': headers });
    }

    play(token: any): Observable<Card[]> {
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', "Bearer " + token);
      return  this.http.post<any>(this.API_URL+'play', {bet: 500} ,{ 'headers': headers });
    }

    hit(token: any): Observable<Card[]> {
        const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
.set('Authorization', "Bearer " + token);
      return  this.http.get<Card[]>(this.API_URL+'hit', { 'headers': headers });
    }

    stay(token: any): Observable<any> {
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', "Bearer " + token);
      return  this.http.post<any>(this.API_URL+'stay', {} ,{ 'headers': headers });
    }

    // registrar(orden: Orden): Observable<Orden> {
    //   return this.http.post<Orden>(this.API_URL, orden);
    // }

}
