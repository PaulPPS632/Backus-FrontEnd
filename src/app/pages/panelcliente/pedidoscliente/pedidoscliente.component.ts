import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { PedidosService } from '../../../services/pedidos.service';
import { TablesComponent } from '../../../components/tables/tables.component';

@Component({
  selector: 'app-pedidoscliente',
  standalone: true,
  imports: [TablesComponent],
  templateUrl: './pedidoscliente.component.html',
  styleUrl: './pedidoscliente.component.css',
})
export class PedidosclienteComponent implements OnInit {
  username: string = '';
  constructor(
    private pedidosService: PedidosService,
    private router: Router,
    private authService: AuthService
  ) {}
  pedidos: any = [];
  ngOnInit(): void {
    this.authService.usuarioID$.subscribe((id) => {
      this.username = id;
      this.pedidosService.getAll(this.username).subscribe((data) => {
        this.pedidos = data;
      });
    });
  }
}
