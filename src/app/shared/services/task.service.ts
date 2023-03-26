import { environment } from './../../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private taskIdCounter = 0;

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(task: Task): Observable<Task> {
    task.id = ++this.taskIdCounter;
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  deleteTask(taskId: number): Observable<any> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.delete(url);
  }
}
