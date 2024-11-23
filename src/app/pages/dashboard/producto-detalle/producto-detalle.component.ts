import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';
import { Producto } from '../../../models/produto.model';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css',
})
export class ProductoDetalleComponent implements OnInit {
  @Input('id') id: string = '';
  productoService = inject(ProductoService);
  producto: Producto = {
    id: '',
    nombre: '',
    pn: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    id_marca: 0,
    id_categoria: 0,
    garantia_cliente: 0,
    garantia_total: 0,
    imagen_principal: '',
    imageurl: [],
  };

  categorias: any[] = [];
  marcas: any[] = [];

  editProducto: Producto = {
    id: '',
    nombre: '',
    pn: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    id_marca: 0,
    id_categoria: 0,
    garantia_cliente: 0,
    garantia_total: 0,
    imagen_principal: '',
    imageurl: [],
  };

  constructor(
    private categoriasService: CategoriasService,
    private marcaService: MarcaService
  ) {}
  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarMarca();
    this.cargarProducto();
  }
  cargarProducto() {
    this.productoService.getById(this.id).subscribe((data) => {
      this.producto = data;
      // const id_marca = this.marcas!.find(
      //   (marca) => marca.nombre === this.producto!.marca
      // ).id;
      // console.log(id_marca);
      // const id_categoria = this.categorias!.find(
      //   (categoria) => categoria.nombre === this.producto!.categoria
      // ).id;
      // this.producto.id_marca = id_marca;
      // this.producto.id_categoria = id_categoria;
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
  guardarCambios() {
    this.editProducto = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      pn: this.producto.pn,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      stock: this.producto.stock,
      id_marca: this.producto.id_marca,
      id_categoria: this.producto.id_categoria,
      garantia_cliente: this.producto.garantia_cliente,
      garantia_total: this.producto.garantia_total,
      imagen_principal: this.producto.imagen_principal,
      imageurl: this.producto.imageurl,
    };
    console.log(this.editProducto);
    const formData = new FormData();

    formData.append('producto', JSON.stringify(this.editProducto));

    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
    }

    if (this.selectedFilePrincipal) {
      formData.append('fileprincipal', this.selectedFilePrincipal);
    } else {
      formData.append('fileprincipal', new Blob(), '');
    }

    this.productoService.putProducto(formData).subscribe({
      next: () => {
        //window.location.reload();
        // Resetear solo los archivos seleccionados, pero mantener el estado del producto
        this.imagencargadaPrincipal = '';
        this.imagencarga = [];
        this.selectedFilePrincipal = null;
        this.selectedFiles = [];

        Swal.fire({
          icon: 'success',
          title: 'Producto Actualizado',
          showConfirmButton: false,
          timer: 1000,
        });
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
      },
    });
  }
  imagencargadaPrincipal: string = '';
  imagencarga: string[] = [];

  selectedFiles: File[] = [];
  selectedFilePrincipal: File | null = null;
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);

      //cargar imagencarga []
      this.selectedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagencarga.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onFileChangePrincipal(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFilePrincipal = event.target.files[0];
      //cargar imagencarga
      if (this.selectedFilePrincipal) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagencarga.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFilePrincipal);
      }
    }
  }
  eliminarImagen(index: number) {
    this.producto.imageurl.splice(index, 1);
    console.log('Lista imagenes: ', this.producto.imageurl);
  }
}
