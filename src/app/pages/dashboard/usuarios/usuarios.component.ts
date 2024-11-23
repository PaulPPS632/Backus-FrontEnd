import { Component, OnInit } from '@angular/core';
import { TablesComponent } from '../../../components/tables/tables.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario.model';
import { ModalComponent } from '../../../components/modal/modal.component';
import Swal from 'sweetalert2';
import { InputComponent } from '../../../components/input/input.component';
import { SelectComponent } from '../../../components/select/select.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    FormsModule,
    TablesComponent,
    ModalComponent,
    InputComponent,
    SelectComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  modal: boolean = false;
  usuario: Usuario = {
    id: 0,
    username: '',
    name: '',
    adress: '',
    phone: '',
    document: '',
    isvalid: false,
    rol: {
      id: 0,
      nombre: '',
      descripcion: '',
      privilegios: '',
    },
  };
  constructor(private usuariosService: UsuarioService) {}
  ngOnInit(): void {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.usuariosService.getAll().subscribe((data) => {
      this.usuarios = data;
    });
  }
  editModalDatos(data: any) {
    //this.togleModal();
    this.usuario = data;
    console.log(this.usuario);
    // this.newProducto.id_categoria = this.categorias.find(
    //   (categoria) => categoria.nombre === data.categoria
    // )?.id;
    // this.newProducto.id_marca = this.marcas.find(
    //   (marca) => marca.nombre === data.marca
    // )?.id;
    // this.router.navigate(['/dashboard/productos/' + data.id]);
  }
  deleteproduct(data: any) {
    Swal.fire({
      title: 'Seguro que quieres Eliminar?',
      text: 'Si realizas esta accion, no se podra revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(data);
      }
    });
  }
  delete(data: any) {
    this.usuariosService.delete(data.id).subscribe({
      next: () => {
        //actualizar productos
        this.cargarUsuarios();
        this.modal = false;
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
          text: 'El producto ha sido eliminado.',
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Producto no eliminado',
          text: error,
        });
      },
    });
  }
  togleModal() {
    console.log('hola');
    this.modal = !this.modal;
  }
}
