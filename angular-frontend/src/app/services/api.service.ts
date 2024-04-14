import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getproduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);

  }

  CreateProduct(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`,data);
  }

}
