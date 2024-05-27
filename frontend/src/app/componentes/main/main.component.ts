import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { BackendService } from '../../services/backend.service';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private backend:BackendService, private router: Router){ }

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
  changeSecondaryColor(newColor: string) {
    console.log('Changing secondary color to: ', newColor);
    document.documentElement.style.setProperty('--secondary', newColor);
  }

  changeColors() {
    const newColors = {
      color_primario: '#e74c3c',
      color_secundario: '#8e44ad',
      color_terciario: '#f1c40f',
      blanco: '#ffffff',
      negro: '#000000',
      font: '30px'
    };

    this.backend.updateColors(newColors).subscribe(response => {
      console.log('Colors updated:', response);
      this.loadColors();
    });
  }

  loadColors() {
    console.log("hihi")
    this.backend.getColors().subscribe(colors => {
      console.log('Current colors:', colors);
      this.applyColors(colors);
    });
  }

  applyColors(colors: any) {
    if (colors && typeof document !== 'undefined') {
      console.log("colores")
      console.log(colors.color_primario);
      document.documentElement.style.setProperty('--primary', colors.color_primario);
      document.documentElement.style.setProperty('--secondary', colors.color_secundario);
      document.documentElement.style.setProperty('--white', colors.color_primario);
      document.documentElement.style.setProperty('--success', colors.color_terciario);
      document.documentElement.style.setProperty('--fontSize', colors.font);
      
      // Puedes aplicar más propiedades si es necesario
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadColors();
    }, 3000); // Retraso de 3 segundos
  }

  logout(){
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/main']);
  }
}
