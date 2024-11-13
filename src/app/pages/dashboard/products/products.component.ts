import { Component, Inject, OnInit } from '@angular/core';
import { TablesComponent } from '../../../components/tables/tables.component';
import { Producto } from '../../../models/produto.model';
import { ProductoService } from '../../../services/producto.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { InputComponent } from '../../../components/input/input.component';
import Swal from 'sweetalert2';
import { CategoriasService } from '../../../services/categorias.service';
import { MarcaService } from '../../../services/marca.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TablesComponent, ModalComponent, InputComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  listaProducts: Producto[] = [];
  modal: boolean = false;
  flagEdit: boolean = false;
  newProducto: Producto = {
    id: '',
    nombre: '',
    pn: '',
    descripcion: '',
    stock: 0,
    precio: 0,
    id_marca: 1,
    id_categoria: 1,
    garantia_cliente: 12,
    garantia_total: 32,
    imagen_principal: '',
    imageurl: [],
  };
  marcaText: string = 'Elige ...';
  categoriaText: string = 'Elige ...';
  selectedFilePrincipal: File | null = null;
  selectedFiles: File[] | null = null;
  categorias: any[] = [];
  marcas: any[] = [];
  constructor(
    private productoService: ProductoService,
    private categoriasService: CategoriasService,
    private marcaService: MarcaService
  ) {}
  ngOnInit(): void {
    this.cargarproductos();
    this.cargarCategorias();
    this.cargarMarca();
  }
  cargarproductos() {
    this.productoService.getAll().subscribe((response: Producto[]) => {
      this.listaProducts = response;
    });
  }
  cargarCategorias() {
    this.categoriasService.getAll().subscribe((response: any) => {
      this.categorias = response;
    });
  }
  cargarMarca() {
    this.marcaService.getAll().subscribe((response: any) => {
      this.marcas = response;
    });
  }
  buscar(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    this.productoService.getSearch(valor).subscribe((response: Producto[]) => {
      this.listaProducts = response;
    });
  }
  selectMarca(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    this.newProducto.id_marca = parseInt(valor);
  }
  selectCategoria(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    this.newProducto.id_categoria = parseInt(valor);
  }
  Crear() {
    const formData = new FormData();
    console.log(this.newProducto);
    formData.append('producto', JSON.stringify(this.newProducto));
    if (this.selectedFilePrincipal) {
      formData.append('fileprincipal', this.selectedFilePrincipal);
    }
    if (this.selectedFiles) {
      this.selectedFiles.forEach((file: File) => {
        formData.append('files', file);
      });
    }
    if (!this.flagEdit) {
      this.productoService.create(formData).subscribe({
        next: () => {
          //actualizar productos
          this.cargarproductos();
          Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: 'El producto ha sido agregado al inventario.',
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Producto no agregado',
            text: error,
          });
        },
      });
    } else {
      this.productoService.update(formData).subscribe({
        next: () => {
          //actualizar productos
          this.cargarproductos();
          this.flagEdit = false;
          Swal.fire({
            icon: 'success',
            title: 'Producto actualizado',
            text: 'El producto ha sido actualizado.',
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Producto no actualizado',
            text: error,
          });
        },
      });
    }
  }

  onFileChangePrincipal(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFilePrincipal = event.target.files[0];
    }
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }
  togleModal() {
    this.modal = !this.modal;
  }

  editModalDatos(data: any) {
    this.flagEdit = true;

    this.newProducto.id = data.id;
    this.newProducto.nombre = data.nombre;
    this.newProducto.descripcion = data.descripcion;
    this.newProducto.stock = data.stock;
    this.newProducto.precio = data.precio;
    this.newProducto.id_categoria = this.categorias.find(
      (categoria) => categoria.nombre === data.categoria
    )?.id;
    this.newProducto.id_marca = this.marcas.find(
      (marca) => marca.nombre === data.marca
    )?.id;
  }
}
