import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  //Depende de la url del localhost que te designe el proyecto a ejecutarlo
  private myAppUrl = 'https://localhost:7261/';

  private myApiUrl = 'api/tarjeta';
  constructor(private http: HttpClient) {}

    getListTarjetas(): Observable<any> {
      return this.http.get(this.myAppUrl + this.myApiUrl);
    }
  


}
