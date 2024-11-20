import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutDashboardComponent,
    children: [
      {
        path: 'categorias',
        loadComponent: () =>
          import('./categorias/categorias.component').then(
            (m) => m.CategoriasComponent
          ),
      },
      {
        path: 'marcas',
        loadComponent: () =>
          import('./marcas/marcas.component').then((m) => m.MarcasComponent),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'productos/:id',
        loadComponent: () =>
          import('./producto-detalle/producto-detalle.component').then(
            (m) => m.ProductoDetalleComponent
          ),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./usuarios/usuarios.component').then(
            (m) => m.UsuariosComponent
          ),
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pedidos/pedidos.component').then((m) => m.PedidosComponent),
      },
    ],
  },
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutesModule {}
