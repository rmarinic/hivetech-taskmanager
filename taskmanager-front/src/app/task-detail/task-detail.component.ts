import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  statuses: string[] = ['NEW', 'IN_PROGRESS', 'COMPLETED'];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTaskById(+id).subscribe((task) => {
        this.task = task;
      });
    }
  }

  updateTask(): void {
    if (this.task && this.task.id !== undefined) {
      this.taskService.updateTask(this.task.id, this.task).subscribe((updatedTask) => {
        this.task = updatedTask;
      });
    }
  }

  deleteTask(): void {
    if (this.task && this.task.id != undefined) {
      this.taskService.deleteTask(this.task.id).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
