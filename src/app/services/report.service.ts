import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private API_URL: string = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

    getResultAvg(): Observable<any> {
          return  this.http.get<any>(this.API_URL+'resultAvg');
  }

  getDailyGames(): Observable<any> {
        return  this.http.get<any>(this.API_URL+'dailyGames');
}

getDealerWinningCards(): Observable<any> {
        return  this.http.get<any>(this.API_URL+'dealerWinningCards');
}

}
