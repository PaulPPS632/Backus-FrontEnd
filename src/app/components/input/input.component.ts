import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() Data: any;
  @Input() Type: string = 'text';
  @Input() Placeholder: string = '';
  @Input() Label: string = '';
  @Input() Name: string = '';
  @Input() Required: boolean = false;
  @Input() Disabled: boolean = false;
  @Input() Value: string = '';
  @Output() DataChange = new EventEmitter<any>();
  onValueChange(value: any) {
    this.DataChange.emit(value);
  }
}
