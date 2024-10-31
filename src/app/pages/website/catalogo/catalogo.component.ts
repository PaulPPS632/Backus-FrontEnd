import { Component, inject } from '@angular/core';
import { CardProductoComponent } from '../../../components/card-producto/card-producto.component';
import { ProductoService } from '../../../services/producto.service';
import { CategoriasService } from '../../../services/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CardProductoComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent {
  productoService = inject(ProductoService);
  categoriasService = inject(CategoriasService);
  productos: any[] = [];
  categorias: any[] = [];
  route = inject(ActivatedRoute);
  router = inject(Router);
  queryParams: any = {
    page: 0,
    size: 10,
    search: '',
    sort: '',
    marca: '',
    categoria: '',
  };

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe((res) => {
      this.categorias = res;
    });

    // Suscribirse a los parámetros de consulta
    this.route.queryParams.subscribe((params) => {
      this.queryParams = { ...this.queryParams, ...params }; // Actualizar los query params
      this.buscarProductos(); // Realizar la búsqueda
    });
  }
  SeleccionCategoria(id: number) {
    this.queryParams.page = 0;
    this.queryParams.size = 10;
    this.queryParams.search = '';
    this.queryParams.sort = '';
    this.queryParams.marca = '';
    this.queryParams.categoria = id;
    this.router.navigate(['catalogo'], {
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  buscarProductos(): void {
    this.productoService.getPaged2(this.queryParams).subscribe((res: any) => {
      this.productos = res;
    });
  }
}
