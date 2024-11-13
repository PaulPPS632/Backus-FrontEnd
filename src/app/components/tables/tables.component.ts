import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() ruta: string = '';
  @Input() param: string = '';
  @Output() activeModal = new EventEmitter<void>();
  @Output() datosEdit = new EventEmitter<any>();
  togleModal(id_producto: string) {
    console.log(id_producto);
    const enviado = this.data.find((dato) => dato.id == id_producto);
    console.log(this.data);
    console.log(enviado);

    this.activeModal.emit();
    this.datosEdit.emit(enviado);
  }
}
