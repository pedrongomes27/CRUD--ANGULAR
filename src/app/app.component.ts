import { Component } from '@angular/core';
import { taskList } from './shared/taskList' ;
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.componentTask.css']
})

export class AppComponent {
  title = 'TooDu List';
  taskForm = this.fb.group({
    title : '',
    priority: '',
    duedate: '',
    description: '',
  });
  tasks: taskList[] = [];

  

  constructor(
    private fb: FormBuilder
  ) { }

  addTask(): void {}
}
