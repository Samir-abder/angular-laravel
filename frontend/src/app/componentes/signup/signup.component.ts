import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public form={
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  }
  public error = '';
  constructor(private backend:BackendService){ }
  ngOnInit(): void {

  }
  submitSignup(){
    //console.log(this.form);
    return this.backend.signup(this.form).subscribe(
      data => console.log(data),
      error => this.handleError(error)
    );
  }
  handleError(error: any) {
    console.log("error");
    if (error.error && error.error.error) {
      this.error = error.error.error;
    } else {
      this.error = "a" || "An error occurred";
    }
    console.log(this.error);
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
