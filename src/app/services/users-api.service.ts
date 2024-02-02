import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/User.type';
import { USERS_API } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(
    private http: HttpClient,
    @Inject(USERS_API) private url: string
  ) {}

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url + '/users');
  }

  public deleteUser(id: number): Observable<unknown> {
    return this.http.delete(this.url + `/users/${id}`);
  }

  public addUser(user: IUser): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.url + '/users', user);
  }

  public editUser(user: Partial<IUser>): Observable<IUser> {
    return this.http.patch<IUser>(this.url + `/users/${user.id}`, user);
  }
}
