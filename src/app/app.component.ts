import { Validators, FormBuilder } from '@angular/forms';
import { Task } from './shared/models/Task'
import { TaskService } from './shared/services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.componentTask.css'],
})
export class AppComponent implements OnInit {

  taskForm = this.fb.group({
    title: ['', Validators.required],
    priority: ['', Validators.required],
    duedate: ['' , Validators.required],
    description: ['', Validators.required],
  })

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService, 
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.fetchAllTask();
  }

  fetchAllTask(): void {
    this.taskService.getTaskList()
    .subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    const newTask = this.taskForm.value;
    this.taskService.createTask(newTask)
      .subscribe(
        (res) => {
          this.fetchAllTask();
          this.taskForm.reset();
          
          console.log('task created');
        },
        (erro) => console.log(erro)
      )
  }
}
