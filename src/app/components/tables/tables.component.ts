import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() ruta: string = '';
  @Input() param: string = '';
}
