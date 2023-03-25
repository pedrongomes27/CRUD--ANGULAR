import { Component } from '@angular/core';
import { taskList } from './shared/taskList' ;
import { Validators, FormBuilder } from '@angular/forms';
import { ServsService } from './shared/servidores/servs.service';


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
    private servsService: ServsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchAllTask();
  }

  fetchAllTask(): void {
    this.servsService.getTaskList()
      .subscribe(task => {
        this.tasks = task;
      });
  }

  addTask(): void {
    const newTask = this.taskForm.value;
    this.servsService.createTask(newTask)
    .subscribe(task => {
      this.fetchAllTask();
      this.taskForm.reset();
      console.log('task created');
    },
    erro =>console.log(erro);
    )
  }
}
