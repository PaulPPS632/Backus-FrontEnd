import { Component, inject } from '@angular/core';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cursosServices = inject(ProductoService);
  Data: any[] = [];
  ngOnInit(): void {
    this.cursosServices.getCoursesHome().subscribe(
      (res) => {
        this.Data = res;
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }
}
