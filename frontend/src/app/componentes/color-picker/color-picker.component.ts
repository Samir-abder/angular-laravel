import { Component } from '@angular/core';
import chroma from 'chroma-js';
import { BackendService } from '../../services/backend.service';
import { error } from 'console';


@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  color = '#ffffff';
  paleta = 'monocromatica';
  colores: string[] = [];

  public form = {
    color_primario: null as string | null,
    color_secundario: null as string | null,
    color_terciario: null as string | null,
    blanco: null as string | null,
    negro: null as string | null,
    font: null as string | null
  }
  public error = '';
  public funco = '';
  constructor(private backend:BackendService){ }
  ngOnInit(): void {

  }
  actualizarColor(colorSeleccionado: string) {
    if (this.paleta !== '') {
      this.actualizarPaleta(this.paleta, colorSeleccionado);
    }
  }


  actualizarPaleta(paletaSeleccionada: string, colorSeleccionado: string) {
    this.paleta = paletaSeleccionada;
    this.color = colorSeleccionado;
    let hsl = chroma(this.color).hsl();
    switch (this.paleta) {
      case 'monocromatica':
        this.colores = chroma.scale([this.color, 'black']).colors(5).slice(0, 3);
        break;

      case 'triada':
        this.colores = chroma.scale([this.color, chroma.hsl(hsl[0] + 120 % 360, hsl[1], hsl[2]),
        chroma.hsl(hsl[0] + 240 % 360, hsl[1], hsl[2])]).colors(3);
        break;
      case 'tetrada':
        this.colores = chroma.scale([this.color, chroma.hsl(hsl[0] + 90 % 360, hsl[1], hsl[2]),
        chroma.hsl(hsl[0] + 180 % 360, hsl[1], hsl[2]), chroma.hsl(hsl[0] + 270 % 360, hsl[1], hsl[2])]).colors(3);
        break;
      case 'analoga':
        this.colores = chroma.scale([this.color, chroma.hsl((hsl[0] + 30) % 360, hsl[1], hsl[2]),
        chroma.hsl((hsl[0] - 30 + 360) % 360, hsl[1], hsl[2])]).colors(3);
        break;

      case 'complementaria':
        this.colores = chroma.scale([this.color, chroma.hsl((hsl[0] + 180) % 360, hsl[1], hsl[2])]).colors(3);
        break;

      case 'predeterminada':
        this.colores = ['#FFFFFF', '#FA8615', '#1F9EC9', '#443D36', '#000000'];
        break;
    }
    // Añade blanco y negro (o tonos cercanos) al final de la paleta
    if (this.paleta !== 'predeterminada') {
      this.colores.push(...chroma.scale(['white', 'black']).colors(2));
    }

    console.log(this.colores); // Imprime los colores en la consola
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    console.log("event");
    const charCode = event.charCode ? event.charCode : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  guardar() {
    this.form.color_primario = this.colores[0];
    this.form.color_secundario = this.colores[1];
    this.form.color_terciario = this.colores[2];
    this.form.blanco = this.colores[3];
    this.form.negro = this.colores[4];
    this.form.font = (<HTMLInputElement>document.getElementById('fuente')).value;
    
    return this.backend.updateColors(this.form).subscribe(
      data => {
        console.log(data);
        this.loadColors(); // Llama a la función colorload aquí
      },
      error => this.handleError(error),
     
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
  ajustarFuente(event: Event) {
    let inputElement = event.target as HTMLInputElement;
    let valor = Number(inputElement.value);
    if (valor < 8) {
      valor = 8;
    } else if (valor > 24) {
      valor = 24;
    } else if (valor == null) {
      valor = 24;
    }
    inputElement.value = valor.toString();
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
