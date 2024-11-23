import { Component } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { TablesComponent } from '../../../components/tables/tables.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Pedido } from '../../../models/pedido.model';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [ModalComponent, FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  pedidos: Pedido[] = [];
  usuarios: any[] = [];
  searchUsuario: any;

  ViewPedidoData: Pedido = {
    id: '',
    username: '',
    fecha: [],
    productos: '',
    datospago: '',
    estado: '',
  };

  flagModal: boolean = false;

  constructor(
    private pedidoService: PedidosService,
    private usuariosService: UsuarioService
  ) {}
  ngOnInit(): void {
    this.usuariosService.getAll().subscribe((data) => {
      this.usuarios = data;
    });
    this.cargarPedidos();
  }
  cargarPedidos() {
    this.pedidoService.getAll().subscribe((data) => {
      this.pedidos = data;
    });
  }
  Search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.usuariosService.getSearch(value).subscribe((data) => {
      this.usuarios = data;
    });
  }
  Searchpedidos(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.pedidoService.getByUser(value).subscribe((data) => {
      this.pedidos = data;
    });
  }
  ViewPedido(id: string) {
    const pedido = this.pedidos.find((pedido) => pedido.id === id);
    if (this.ViewPedidoData.id != pedido?.id && pedido) {
      this.ViewPedidoData = pedido;
      this.ViewPedidoData.productos = JSON.parse(pedido.productos);
      this.ViewPedidoData.datospago = JSON.parse(pedido.datospago);
    }
    this.toogleModal();
  }
  CambiarEstado(id: string, event: Event) {
    if (this.ViewPedidoData) {
      const pedido = {
        id: this.ViewPedidoData.id,
        username: this.ViewPedidoData.username,
        fecha: this.ViewPedidoData.fecha,
        productos: JSON.stringify(this.ViewPedidoData.productos),
        datospago: JSON.stringify(this.ViewPedidoData.datospago),
        estado: this.ViewPedidoData.estado,
      };
      this.pedidoService.CambiarEstado(pedido).subscribe((res) => {
        Swal.fire({
          title: 'Seguro que quieres Eliminar?',
          text: 'Si realizas esta accion, no se podra revertir!',
          icon: 'success',
        });
        this.cargarPedidos();
      });
    }
  }
  toogleModal() {
    this.flagModal = !this.flagModal;
  }
}
