import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.css',
})
export class LayoutDashboardComponent {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    initFlowbite();
  }
  CerrarSesion() {
    this.authService.logout();
  }
}
