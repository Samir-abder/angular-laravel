import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    // Verificar si el token existe y es válido
    const token = localStorage.getItem('token');
    if (token) {
      // Puedes agregar lógica adicional para verificar la validez del token aquí
      return true;
    }
    return false;
  }
}
