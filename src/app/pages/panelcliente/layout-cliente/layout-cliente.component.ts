import { Component } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-cliente',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './layout-cliente.component.html',
  styleUrl: './layout-cliente.component.css',
})
export class LayoutClienteComponent {}
