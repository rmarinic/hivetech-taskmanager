import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Task } from '../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input() task: Task = { title: '', description: '', status: 'NEW', dueDate: new Date() }
  @Output() save = new EventEmitter<Task>();

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if(taskId) {
      this.taskService.getTaskById(+taskId).subscribe(task => {
        this.task = task;
      })
    }
  }

  onSubmit() {
    this.taskService.saveTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    })
  }
}
