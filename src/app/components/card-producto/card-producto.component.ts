import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartStateService } from '../../services/cart-state.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css',
})
export class CardProductoComponent {
  @Input() producto: any;
  CartStateService = inject(CartStateService);
  router = inject(Router);
  ngOnInit(): void {
    console.log(this.producto);
  }
  Agregar() {
    const agregado = this.CartStateService.addCurso(this.producto);
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
        title: 'Este producto ya está en el carrito',
        text: 'Se aumentara la cantidad',
        timer: 1400,
        showConfirmButton: false,
      });
    }
  }
}
