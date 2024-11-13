import { Component } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';
import { TablesComponent } from '../../../components/tables/tables.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { InputComponent } from '../../../components/input/input.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [TablesComponent, ModalComponent, InputComponent],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css',
})
export class MarcasComponent {
  listaMarcas: any[] = [];
  modal: boolean = false;
  flagEdit: boolean = false;
  newCategoria = {
    id: '',
    nombre: '',
  };
  constructor(private marcaService: MarcaService) {}
  Crear() {
    if (!this.flagEdit) {
      this.marcaService.create(this.newCategoria).subscribe({
        next: () => {
          //actualizar productos
          this.cargarMarcas();
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
      this.marcaService.update(this.newCategoria).subscribe({
        next: () => {
          //actualizar productos
          this.cargarMarcas();
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
  limpiar() {
    this.newCategoria = {
      id: '',
      nombre: '',
    };
  }
  ngOnInit(): void {
    this.cargarMarcas();
  }
  cargarMarcas() {
    this.marcaService.getAll().subscribe((response: any) => {
      this.listaMarcas = response;
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
    console.log(data);
    this.togleFlagEdit();
    this.newCategoria.id = data.id;
    this.newCategoria.nombre = data.nombre;
  }
}
