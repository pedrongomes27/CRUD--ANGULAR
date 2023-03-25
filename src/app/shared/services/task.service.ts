import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTaskList(): Observable<Task[]> {
    const url = this.baseUrl + "task";
    return this.http.get<Task[]>(url);
  }

  createTask(task: Task): Observable<Object> {
    const url = this.baseUrl + "task";
    return this.http.post<Object>(url, task);
  }
}
