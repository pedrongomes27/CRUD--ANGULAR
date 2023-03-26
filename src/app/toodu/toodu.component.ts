import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './../shared/services/task.model';
import { TaskService } from './../shared/services/task.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-toodu',
  templateUrl: './toodu.component.html',
  styleUrls: ['./toodu.component.css','./toodu.componentTask.css'],
})
export class TooduComponent implements OnInit {
  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['null', Validators.required],
    dueDate: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit() {  }


  onSubmit() {
    const task: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      dueDate: this.taskForm.value.dueDate,
    };

    this.taskService.addTask(task).subscribe((newTask) => {
      console.log('Task added successfully:', newTask);
      // Salvar a lista atualizada de tarefas no armazenamento local
      const tasks = this.taskService.getAllTasks().subscribe((tasks) => {
        this.localStorageService.setItem('tasks', tasks);
        console.log('Tasks saved to local storage:', tasks);
      });
    });
  }
}