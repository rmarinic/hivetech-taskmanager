import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  newTask() {
    this.router.navigate(['/tasks/new']); // Navigacija do forme za novi zadatak
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks/edit', task.id]); // Navigacija do forme za uređivanje zadatka
  }

  deleteTask(taskId: number | undefined) {
    if (taskId !== undefined) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      });
    } else {
      console.error('Task ID is undefined');
    }
  }
}
