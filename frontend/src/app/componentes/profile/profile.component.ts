import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { error } from 'console';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public form = {
    name: "",
    email: "",
    lastName: "",
    idNumber: "",
    phone: "",
    state: "",
    city: "",
    file: "",
  };

  public states = [
    { name: "Carabobo", cities: ["Valencia", "Naguanagua", "San Diego"] },
    { name: "Aragua", cities: ["Maracay", "Turmero","Villa del cura"] },
    { name: "Zulia", cities: ["Maracaibo", "Cabimas", "Ciudad ojeda"] },

    // Agrega más estados y ciudades según sea necesario
  ];

  public cities: string[] = [];
  public error: any = [];
  public exito= '';
  public previsualizacion: string = ''; // Assign an initial value to the 'previsualizacion' property

  constructor(private backend: BackendService, private sanitizer: DomSanitizer) { }
  public archivos: any = []
  loading: boolean | undefined;
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') { // Comprobar si localStorage está definido
      const email = localStorage.getItem('email'); // Obtener el email del localStorage
      if (email) {
        this.getData(email); // Llamar al método getData con el email obtenido
      }
    }
  }

  // Método para permitir solo números
  allowOnlyNumbers(event: KeyboardEvent) {
    console.log("event");
    const charCode = event.charCode ? event.charCode : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  submitUpdate() {
    console.log(this.form);
    const formData = new FormData();
    formData.append('email', this.form.email);
    formData.append('file', this.form.file);
    formData.append('name', this.form.name);
    formData.append('lastName', this.form.lastName);
    formData.append('idNumber', this.form.idNumber);
    formData.append('phone', this.form.phone);
    formData.append('state', this.form.state);  
    formData.append('city', this.form.city);
    console.log(formData.get('file'));
  
    return this.backend.updateUser(formData).subscribe(
      data => this.exito = 'Usuario actualizado correctamente',
      error => this.handleError(error),
    
      
    );
  }
  
  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0]
    this.form.file = archivoCapturado;
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })
    this.archivos.push(archivoCapturado)
    // 
    // console.log(event.target.files);

  }


  extraerBase64 = async ($event: any) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = () => {
          resolve({
            base: null
          });
        };
      });
    } catch (e) {
      return null;
    }
  }


  /**
   * Limpiar imagen
   */

  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }
  

  handleError(error: any) {
    this.error = error.error.erros;
  }

  getData(email: string) {
    this.backend.getUser(email).subscribe(
      (data: any) => {
        console.log(data);
        // Actualizar el formulario con los datos del usuario
        this.form.name = data.user.name;
        this.form.lastName = data.user.lastName;
        this.form.idNumber = data.user.idNumber;
        this.form.email = data.user.email;
        this.form.phone = data.user.phone;
        this.form.state = data.user.state;
        this.form.city = data.user.city;
        this.form.file = data.user.file;
        this.cities = this.states.find(state => state.name === data.user.state)?.cities || [];
        this.previsualizacion = 'http://localhost:8000/storage/files/' + data.user.foto;
    },
    error => console.log(error)
      
    );
  }

  public onStateChange(): void {
    const selectedState = this.states.find(state => state.name === this.form.state);
    this.cities = selectedState ? selectedState.cities : [];
    this.form.city = ""; // Reinicia la ciudad seleccionada cuando se cambia el estado
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
