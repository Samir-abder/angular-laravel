import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public form={
    email:'',
    password:null
  }

  public error = null;
  constructor(private backend:BackendService, private router: Router){ }
  ngOnInit(): void {
  }
  submitLogin(){
    return this.backend.login(this.form).subscribe(
      (data: any) => {
        const accessToken: string = data['access_token'];
        console.log(accessToken);
        // Luego puedes guardar el token en localStorage o en una cookie
        this.saveToken(accessToken);
        this.saveEmail(this.form.email);
        this.router.navigate(['/main']);
      },
      error => this.handleError(error)  
    );
  }
  
  handleError(error:any){
    this.error = error.error.error;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  saveEmail(email: string): void {
    localStorage.setItem('email', email);
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
}
