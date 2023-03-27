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
  saveBttActive = false;
  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: [null, Validators.required],
    dueDate: [null, Validators.required],
    completed: [false],
  });

  tasks: Task[] = [];
  selectedTask: Task | null = null;
task: any;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onSubmit() {
    const newTask: Task = this.taskForm.value;
    this.taskService.addTask(newTask).subscribe((newTask) => {
      console.log('Task added successfully:', newTask);
      const tasks = this.taskService.getAllTasks().subscribe((tasks) => {
        this.taskForm.reset();
        this.fetchTasks();
      });
    });
  }

  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(() => {
      console.log('Task updated successfully');
    });
  }
  
  deleteTask(task: Task): void {
      this.taskService.deleteTask(task.id).subscribe(
        () => {
          this.fetchTasks();
          console.log(task.id + "deletado");
        },
        (error) => console.log(error)
      );
  }

  selectTask(task: Task) {
    this.selectedTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      completed: task.completed
    });
    this.saveBttActive = true;
  }

  updateTask(): void {
    if (!this.selectedTask) {
      console.log('Nenhuma tarefa selecionada para atualizar');
      return;
    }
  
    const updatedTask: Task = {
      ...this.selectedTask,
      ...this.taskForm.value,
    };
  
    console.log('Tarefa atualizada:', updatedTask);
  
    this.taskService.updateTask(updatedTask).subscribe(() => {
      console.log('Tarefa atualizada com sucesso');
      this.selectedTask = null;
      this.taskForm.reset();
      this.fetchTasks();
    });
  }
  
  
}
