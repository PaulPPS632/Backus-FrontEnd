import { Component, inject, Input, OnInit } from '@angular/core';
import { CartStateService } from '../../services/cart-state.service';
import { Curso } from '../../models/curso.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-curso-item',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart-curso-item.component.html',
  styleUrl: './cart-curso-item.component.css',
})
export class CartCursoItemComponent implements OnInit {
  @Input() producto: any;
  ngOnInit(): void {}
  cartStateService = inject(CartStateService);

  removeCurso(curso: any) {
    this.cartStateService.removeCurso(curso);
  }

  Remove() {
    this.cartStateService.removeCurso(this.producto.id);
  }
  handleIncrease() {
    const newCantidad = this.producto.cantidad + 1;
    console.log(newCantidad);
    this.cartStateService.updateCursoCantidad(this.producto.id, newCantidad);
  }

  handleDecrease() {
    if (this.producto.cantidad > 1) {
      const newCantidad = this.producto.cantidad - 1;
      this.cartStateService.updateCursoCantidad(this.producto.id, newCantidad);
    }
  }
}
