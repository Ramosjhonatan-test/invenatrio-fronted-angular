import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegisterComponent {
  name: string = ''; 
  email: string = ''; 
  phone: string = ''; 
  password: string = '';
  passwordVisible: boolean = false; // Estado de visibilidad de la contraseña

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.authService.register(this.name, this.email, this.phone, this.password).subscribe(
      (response: any) => {
        console.log('Usuario registrado:', response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error durante el registro:', error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Navega al formulario de inicio de sesión
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
