import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/User.model';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: User = new User();
  erreur: boolean = false;
  private authService = inject(Auth);
  private router = inject(Router);

  onLoggedin() {
    const isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser) this.router.navigate(['/']);
    else this.erreur = true;
  }
}
