import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {
  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      // Verificar si el token existe y es válido
      const token = localStorage.getItem('token');
      if (token) {
        // Puedes agregar lógica adicional para verificar la validez del token aquí
        return true;
      }
    }
    return false;
  }
  constructor(private router: Router){ }
  logout(){
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/main']);
  }
}
