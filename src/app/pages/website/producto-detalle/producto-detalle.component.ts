import { Component, inject, Input } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { CartStateService } from '../../../services/cart-state.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css',
})
export class ProductoDetalleComponent {
  @Input('id') id!: string;
  productoService = inject(ProductoService);
  cartStateService = inject(CartStateService);
  router = inject(Router);
  producto: any;
  recomendados: any[] = [];
  ngOnInit(): void {
    this.productoService.getCourseById(this.id).subscribe((res) => {
      this.producto = res;
    });
  }

  Agregar() {
    const agregado = this.cartStateService.addCurso(this.producto);
    if (agregado) {
      Swal.fire({
        icon: 'success',
        title: 'Agregado al carrito',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Seguir Comprando',
        denyButtonText: `Ir a Pagar`,
      }).then((result) => {
        if (result.isDenied) {
          this.router.navigate(['/carrito']);
        }
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Este curso ya está en el carrito',
        showCancelButton: true,
        confirmButtonText: 'OK',
      });
    }
  }
}
