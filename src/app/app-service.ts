import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository, User } from './users.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    private baseUrl = 'https://api.github.com/users';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}`)
    }

    getUserRepos(username: string, pagination?: number): Observable<any[]> {
      // No se usa la pagincacion de la api de github por falta de docuemntación clara
      // Para ver implementacion mediante octokit ver: url_proyecto_octokit
      // let params = {
      //   pagination: pagination ? pagination.toString() : '1',
      //   per_page: '4'
      // };

      return this.http.get<Repository[]>(`${this.baseUrl}/${username}/repos`);
    }
}
