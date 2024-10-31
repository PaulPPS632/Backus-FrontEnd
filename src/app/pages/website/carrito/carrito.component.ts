import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CartCursoItemComponent } from '../../../components/cart-curso-item/cart-curso-item.component';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../../models/curso.model';
import { CartStateService } from '../../../services/cart-state.service';
import { AuthService } from '../../../services/auth.service';
import { PaymentService } from '../../../services/payment.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import KRGlue from '@lyracom/embedded-form-glue';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CartCursoItemComponent, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  productos: Curso[] = [];
  cartStateService = inject(CartStateService);
  authService = inject(AuthService);
  paymentService = inject(PaymentService);
  chRef = inject(ChangeDetectorRef);
  router = inject(Router);
  precioTotal = 0;
  ProgressStyle = {
    //barra de progreso
    width: '0%',
  };
  activeIndex = 0;
  data = {
    amount: this.precioTotal * 100,
    currency: 'PEN',
    orderId: 'ORDER-' + uuidv4(),
    customer: {
      email: '',
      billingDetails: {
        firstName: '',
        lastName: '',
        cellPhoneNumber: '',
        address: '',
        district: 'Ficus',
        city: 'Santa Anita',
        state: 'Lima',
        country: 'PE',
        identityCode: '',
        identityType: 'DNI',
      },
    },
  };
  ngOnInit(): void {
    this.cartStateService.cursos$.subscribe((qty) => {
      this.productos = qty;
    });
    this.cartStateService.total$.subscribe((total) => {
      this.precioTotal = total;
    });
  }
  ProcederCompletarDatos() {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn.estado) {
        if (this.productos.length != 0) {
          this.showDiv(1);
          this.ProgressBar(33);
          this.data.amount = this.precioTotal * 100;
          this.data.orderId = 'ORDER-' + uuidv4();
          console.log(isLoggedIn.user);
          this.data.customer.email = isLoggedIn.user.email;
          this.data.customer.billingDetails.firstName = isLoggedIn.user.nombre;
          this.data.customer.billingDetails.lastName = isLoggedIn.user.apellido;
          this.data.customer.billingDetails.cellPhoneNumber =
            isLoggedIn.user.telefono;
          this.data.customer.billingDetails.address = isLoggedIn.user.direccion;
          this.data.customer.billingDetails.identityCode =
            isLoggedIn.user.documento;
        } else {
          Swal.fire('Error', 'No hay productos en el carrito', 'error');
        }
      } else {
        Swal.fire({
          title: 'Necesita Iniciar Sesion',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ir a Login',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/sign-in']);
          }
        });
      }
    });
  }
  message = '';
  formtoken = '';
  ProcesoPagoTarjeta() {
    this.ProgressBar(100);
    const endpoint = 'https://api.micuentaweb.pe';
    const publicKey =
      '87365204:testpublickey_TjJxMZ9Mzbgk7ga0Zd5Hh59l3AUoNbnN1zwHNUnct4QsU';
    this.paymentService.postExternalData(this.data).subscribe((data) => {
      this.formtoken = data.formToken;
      KRGlue.loadLibrary(endpoint, publicKey) // Load the remote library
        .then(({ KR }) =>
          KR.setFormConfig({
            //set the minimal configuration
            formToken: this.formtoken,
            'kr-language': 'es-ES',
            //to update initialization parameter
          })
        )
        .then(({ KR }) =>
          KR.onSubmit(async (paymentData) => {
            this.paymentService.validatePayment(paymentData).subscribe(
              (response) => {
                if (response.Status) {
                  //this.RegistrarPedido();
                } else {
                  this.message = 'no pagado';
                }
                this.chRef.detectChanges();
              },
              (_error) => {
                this.message = 'PIPIPI';
              }
            );
            return true;
          })
        )
        .then(({ KR }) => KR.renderElements('#myPaymentForm'));
    });
  }
  /*
  RegistrarPedido() {
    const pedido = {
      userId: this.UserID,
      productos: JSON.stringify(this.state.products()),
      datospago: JSON.stringify(this.data),
      estado: 'NUEVO',
    };
    
    this.pedidoService.registrar(pedido).subscribe();
    this.RediccionPanelOpen = true;
  }
  */
  EstiloContenedorDatos = {
    display: 'block',
  };
  EstiloPasarella = {
    display: 'none',
  };

  RegresarCarrito() {
    this.ProgressBar(0);
    this.showDiv(0);
  }
  ProcederPago() {
    if (this.verificarDatos()) {
      this.ProgressBar(66);
      this.showDiv(2);
      this.EstiloContenedorDatos.display = 'none';
      this.EstiloPasarella.display = 'block';
    } else {
      Swal.fire('Error', 'Complete todos los campos', 'error');
    }
  }
  verificarDatos(): boolean {
    return (
      this.data.customer.billingDetails.firstName != '' &&
      this.data.customer.billingDetails.lastName != '' &&
      this.data.customer.billingDetails.cellPhoneNumber != '' &&
      this.data.customer.billingDetails.address != '' &&
      this.data.customer.billingDetails.identityCode != '' &&
      this.data.customer.email != ''
    );
  }
  showDiv(index: number) {
    this.activeIndex = index;
  }
  ProgressBar(percentaje: number) {
    this.ProgressStyle.width = `${percentaje}%`;
  }
}
