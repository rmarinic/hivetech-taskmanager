import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Task[]>(this.baseUrl, { headers });
  }

  getTaskById(id: number): Observable<Task> {
    const headers = this.getAuthHeaders();
    return this.http.get<Task>(`${this.baseUrl}/${id}`, { headers });
  }

  saveTask(task: Task): Observable<Task> {
    const headers = this.getAuthHeaders();
    return this.http.post<Task>(this.baseUrl, task, { headers });
  }

  deleteTask(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>('${this.baseUrl}/${id}', { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || ''; // Adjust this based on how you store your token
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
