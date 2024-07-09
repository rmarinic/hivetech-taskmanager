import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = { username: '', password: '', email: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register({ username: this.user.username, password: this.user.password, email: this.user.email}).subscribe(() => {
      this.router.navigate(['/login']);
    }, error => {
      console.error('Registration failed', error);
    })
  }
}
