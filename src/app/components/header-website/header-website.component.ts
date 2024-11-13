import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartStateService } from '../../services/cart-state.service';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-website',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header-website.component.html',
  styleUrl: './header-website.component.css',
})
export class HeaderWebsiteComponent implements OnInit {
  quantity = 0;
  total = 0;
  cartStateService = inject(CartStateService);
  queryParams: any = {
    page: 0,
    size: 10,
    search: '',
    sort: '',
    marca: '', // Ajusta esto según tus necesidades
    categoria: '',
  };
  constructor(private router: Router) {}
  ngOnInit(): void {
    initFlowbite();
    this.cartStateService.quantity$.subscribe((qty) => {
      this.quantity = qty;
    });
    this.cartStateService.total$.subscribe((total) => {
      this.total = total;
    });
  }
  buscar(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);
    this.queryParams.search = inputElement.value;
    this.router.navigate(['catalogo'], {
      //relativeTo: this.route,
      queryParams: this.queryParams,
      queryParamsHandling: 'merge', // O 'preserve' si quieres mantener los parámetros existentes
    });
  }
}
