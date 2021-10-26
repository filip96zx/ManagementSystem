import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface HttpRequestOptions {
  params?: HttpParams;
  headres?: HttpHeaders;
}
@Injectable({
  providedIn: 'root'
})
export class RestService {


  constructor(public http: HttpClient) { }

  get<T1>(
    endpoint: string,
    params?: any
  ): Observable<T1> {
    if (params) {
      params = new HttpParams({
        fromObject: params
      });
    }
    return this.http.get<T1>(`${environment.api}${endpoint}`, { params });
  }
  getBlob(endpoint: string): Observable<Blob> {
    return this.http.get(`${environment.api}${endpoint}`, { responseType: 'blob' });
  }
  delete<T1>(endpoint: string):
    Observable<T1> {
    return this.http.delete<T1>(`${environment.api}${endpoint}`);

  }

  post<T1, T2>(
    endpoint: string,
    params: T1,
  ): Observable<T2> {
    return this.http.post<T2>(`${environment.api}${endpoint}`,
      params
    );
  }
  put<T1, T2>(
    endpoint: string,
    params: T1,
  ): Observable<T2> {
    return this.http.put<T2>(`${environment.api}${endpoint}`,
      params
    );
  }
  patch<T1, T2>(
    endpoint: string,
    params: T1,
  ): Observable<T2> {
    return this.http.patch<T2>(`${environment.api}${endpoint}`,
      params
    );
  }

}
