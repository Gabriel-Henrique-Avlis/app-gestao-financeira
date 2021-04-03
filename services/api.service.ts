import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getC(): Observable<any> {
    return this.http.get(`${baseUrl}/categories`);
  }

  deleteC(id): Observable<any> {
    return this.http.delete(`${baseUrl}/categories/delete/${id}`);
  }

  createC(data): Observable<any> {
    return this.http.post(`${baseUrl}/categories/create`, data);
  }

  getI(id): Observable<any> {
    return this.http.get(`${baseUrl}/itens/${id}`)
  }

  createI(data): Observable<any> {
    return this.http.post(`${baseUrl}/itens/create`, data)
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}