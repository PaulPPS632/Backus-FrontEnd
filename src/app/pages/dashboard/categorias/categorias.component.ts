import { Component } from '@angular/core';
import { TablesComponent } from '../../../components/tables/tables.component';
import { CategoriasService } from '../../../services/categorias.service';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [TablesComponent, InputComponent, ModalComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  listaCategorias: any[] = [];
  modal: boolean = false;
  flagEdit: boolean = false;
  newCategoria = {
    id: '',
    nombre: '',
    descripcion: '',
  };
  constructor(private categoriasService: CategoriasService) {}
  Crear() {
    if (!this.flagEdit) {
      this.categoriasService.create(this.newCategoria).subscribe({
        next: () => {
          //actualizar productos
          this.cargarCategorias();
          this.togleModal();
          Swal.fire({
            icon: 'success',
            title: 'Marca agregada',
            text: 'La Marca ha sido agregado al inventario.',
          });
        },
        error: (error) => {
          this.togleModal();
          Swal.fire({
            icon: 'error',
            title: 'Marca no agregada',
            text: error,
          });
        },
      });
    } else {
      this.categoriasService.update(this.newCategoria).subscribe({
        next: () => {
          //actualizar productos
          this.cargarCategorias();
          this.togleModal();
          Swal.fire({
            icon: 'success',
            title: 'Marca Editada',
          });
        },
        error: (error) => {
          this.togleModal();
          Swal.fire({
            icon: 'error',
            title: 'Marca no editada',
            text: error,
          });
        },
      });
    }
  }
  ngOnInit(): void {
    this.cargarCategorias();
  }
  cargarCategorias() {
    this.categoriasService.getAll().subscribe((response: any) => {
      this.listaCategorias = response;
    });
  }
  togleModal() {
    this.modal = !this.modal;
    if (!this.modal) this.flagEdit = false;
  }
  togleFlagEdit() {
    this.flagEdit = !this.flagEdit;
  }
  editModalDatos(data: any) {
    this.togleFlagEdit();
    this.newCategoria.id = data.id;
    this.newCategoria.nombre = data.nombre;
    this.newCategoria.descripcion = data.descripcion;
  }
}
