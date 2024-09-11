import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './config';
import { Observable } from 'rxjs';
import { GetListRes } from '../interfaces/resource.interface';

@Injectable({ providedIn: 'root' })
class ResourceService {
  constructor(private http: HttpClient) { }

  getList(page: number = 1): Observable<GetListRes> {
    return this.http.get<GetListRes>(`${API_URL}unknown?page=${page}`)
  }
}


export { ResourceService }
