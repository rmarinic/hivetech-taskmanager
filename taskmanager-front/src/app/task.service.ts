import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.baseUrl, task);
  }

  updateTask(id: number, task: any): Observable <any> {
    return this.http.put('${this.baseUrl}/${id}', task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete('${this.baseUrl}/${id}');
  }
}
