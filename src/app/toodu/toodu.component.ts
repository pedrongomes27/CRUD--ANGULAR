import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './../shared/services/task.model';
import { TaskService } from './../shared/services/task.service';

@Component({
  selector: 'app-toodu',
  templateUrl: './toodu.component.html',
  styleUrls: ['./toodu.component.css', './toodu.componentTask.css'],
})

export class TooduComponent implements OnInit {
  taskForm: FormGroup = this.fb.group({
    id: [this.taskService.taskIdCounter],
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: [null, Validators.required],
    dueDate: [null, Validators.required],
    completed: [false],
  });

  tasks: Task[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onSubmit(){ 
    const newTask: Task = this.taskForm.value;
    this.taskService.addTask(newTask).subscribe(() => {
      console.log('Task added successfully');
      this.taskForm.reset();
      this.fetchTasks();
      this.taskLog(newTask);
    });
  }

  taskLog(task: Task): void {
    console.log(task.id, task.title)
  }

  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(() => {
      console.log('Task updated successfully');
    });
  }
  
  deleteTask(task: Task): void {
      this.taskService.deleteTask(task.id)
      .subscribe(
        () => {
          this.fetchTasks();
          console.log(task.id + "deletado");
        },
        (error) => console.log(error)
      );
  }
}
