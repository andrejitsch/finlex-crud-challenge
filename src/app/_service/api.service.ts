import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get<any[]>('http://dummy.restapiexample.com/api/v1/employees');
  }

  addData(object): Observable<any> {
    // @ts-ignore
    return this.http.post<any[]>('http://dummy.restapiexample.com/api/v1/create?' + object);
  }

  deleteData(objectID): Observable<any> {
    return this.http.delete<any[]>('http://dummy.restapiexample.com/api/v1/delete/' + objectID.toString());
  }

  updateEmployee(objectID, object): Observable<any> {
    return this.http.put<any[]>('http://dummy.restapiexample.com/api/v1/update/' + objectID, object);
  }
}
