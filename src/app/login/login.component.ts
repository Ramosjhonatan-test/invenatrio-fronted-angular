import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Usuario autenticado:', response);
        this.router.navigate(['/menu/reportes']); // Redirigir al menú después de iniciar sesión
      },
      (error: any) => {
        console.error('Error durante el inicio de sesión:', error);
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Navega al formulario de registro
  }
}
