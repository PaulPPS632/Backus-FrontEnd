import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ModalComponent, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  UserNew = {
    username: '',
    password: '',
    name: '',
    apellido: '',
    document: '',
    adress: '',
    phone: '',
    rol: 'cliente',
  };
  CreateOpen = false;
  authService = inject(AuthService);
  router = inject(Router);
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //Flowbite se inicia después de que se haya cargado la pagina
        setTimeout(() => initFlowbite(), 0);
      }
    });
  }
  openCModal() {
    this.CreateOpen = true;
  }
  closeModal() {
    this.CreateOpen = false;
  }
  register() {
    this.authService.register(this.UserNew).subscribe(
      (response) => {
        this.CreateOpen = false;
        Swal.fire({
          icon: 'success',
          title: 'Entidad Registrada',
          text: response.message,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
        });
      }
    );
  }

  login() {
    this.authService
      .Logged(this.UserNew.username, this.UserNew.password)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.rol === 'cliente') {
            this.router.navigate(['/panel']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
          });
        }
      );
  }
}
