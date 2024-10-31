import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutWebsiteComponent } from './layout-website/layout-website.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutWebsiteComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'catalogo',
        loadComponent: () =>
          import('./catalogo/catalogo.component').then(
            (m) => m.CatalogoComponent
          ),
        data: {
          title: 'Catálogo',
        },
      },
      {
        path: 'producto/:id',
        loadComponent: () =>
          import('./producto-detalle/producto-detalle.component').then(
            (m) => m.ProductoDetalleComponent
          ),
        data: {
          title: 'Curso Detalle',
        },
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('./carrito/carrito.component').then((m) => m.CarritoComponent),
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./sign-in/sign-in.component').then((m) => m.SignInComponent),
      },
    ],
  },
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutesModule {}
