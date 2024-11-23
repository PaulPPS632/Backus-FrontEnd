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
  @Output() deleteElement = new EventEmitter<any>();
  @Output() datosEdit = new EventEmitter<any>();
  togleModal(id_producto: string) {
    const enviado = this.data.find((dato) => dato.id == id_producto);
    this.activeModal.emit();
    this.datosEdit.emit(enviado);
  }
  delete(id_producto: string) {
    const enviado = this.data.find((dato) => dato.id == id_producto);
    this.deleteElement.emit(enviado);
  }
}
