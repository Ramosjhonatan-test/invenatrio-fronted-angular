import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [RouterModule]
})
export class MenuComponent {
  isCollapsed: boolean = false;

  constructor(private router: Router) { }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(section: string) {
    this.router.navigate([`/menu/${section}`]); // Navegar a la sección seleccionada
  }

  logout() {
    this.router.navigate(['/login']); // Redirigir al login
  }
}
