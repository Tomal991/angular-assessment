import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getData():Observable<any> {
    return this.http.get(environment.baseUrl);
  }
  getById(id:string):Observable<any> {
    return this.http.get(`${environment.baseUrl}${id}`);
  }
  postData(data: any):Observable<any> {
    return this.http.post(environment.baseUrl, data);
  }
  updateData(id:string,data:any):Observable<any> {
    return this.http.put(`${environment.baseUrl}${id}`,data)
  }
  deleteData(id:string):Observable<any> {
    return this.http.delete(`${environment.baseUrl}${id}`)
  }
}
