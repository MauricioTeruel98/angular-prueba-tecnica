import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TableComponent } from '../table/table.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar AuthService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, TableComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = 'angular-prueba';
  selectedCategory: string = '';
  selectedLimit: number = 10;

  constructor(private authService: AuthService, private router: Router) {}

  applyFilters() {
    // Este método existe para desencadenar la detección de cambios
    // en Angular y actualizar los valores de los inputs
    console.log('Category:', this.selectedCategory, 'Limit:', this.selectedLimit);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
