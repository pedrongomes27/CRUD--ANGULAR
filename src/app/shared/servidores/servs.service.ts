import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { taskList } from '../taskList';

@Injectable({
  providedIn: 'root'
})
export class ServsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTaskList(): Observable<taskList[]> {
    const url = this.baseUrl + "task";
    return this.http.get<taskList[]>(url);
  }

  createTask(servs: taskList): Observable<Object> {
    const url = this.baseUrl + "task";
    
    return this.http.post<Object>(url, servs);
  }
}
