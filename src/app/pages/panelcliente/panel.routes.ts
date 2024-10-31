import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClienteComponent } from './layout-cliente/layout-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClienteComponent,
    children: [
      {
        path: '',
        redirectTo: 'pedidos',
        pathMatch: 'full',
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pedidoscliente/pedidoscliente.component').then(
            (m) => m.PedidosclienteComponent
          ),
        data: {
          title: 'Matriculados',
        },
      },
    ],
  },
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutesModule {}
