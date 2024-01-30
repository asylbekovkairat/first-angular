import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../models/User.type';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  http = inject(HttpClient);

  constructor(http: HttpClient) {
    this.http = http;
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
