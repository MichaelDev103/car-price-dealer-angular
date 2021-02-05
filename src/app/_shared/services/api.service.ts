import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  postRequest(url: any, data = {}) {
    return this.http.post(url, data);
  }

  getRequest(url: any, data = {}) {
    return this.http.get(url, data);
  }

  putRequest(url: any, data = {}) {
    return this.http.put(url, data);
  }

  delete(url: any) {
    return this.http.delete(url);
  }
}
