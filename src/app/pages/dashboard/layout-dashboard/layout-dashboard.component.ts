import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.css',
})
export class LayoutDashboardComponent {
  constructor() {}
  ngOnInit(): void {
    initFlowbite();
  }
}
