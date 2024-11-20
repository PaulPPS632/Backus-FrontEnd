import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartStateService } from '../../services/cart-state.service';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  Usuario: string = '';
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    initFlowbite();
    this.cartStateService.quantity$.subscribe((qty) => {
      this.quantity = qty;
    });
    this.cartStateService.total$.subscribe((total) => {
      this.total = total;
    });
    this.authService.usuario$.subscribe((user) => {
      if (user) {
        this.Usuario = user;
        console.log(this.Usuario);
      }
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
  Sesion() {
    if (this.Usuario) {
      this.Usuario = '';
      this.authService.logout();
    } else {
      this.router.navigate(['sign-in']);
    }
  }
}
