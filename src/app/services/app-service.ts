import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository, User } from '../interfaces/app.interface';


@Injectable({
  providedIn: 'root'
})
export class AppService {
    private baseUrl = 'https://api.github.com/users';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}`)
    }

    getUserRepos(username: string): Observable<any[]> {
      return this.http.get<Repository[]>(`${this.baseUrl}/${username}/repos`);
    }
}
