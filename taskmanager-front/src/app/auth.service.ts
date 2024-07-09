import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post('${this.baseUrl}/register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post('${this.baseUrl}/login', user);
  }
}
