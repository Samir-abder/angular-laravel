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
    }
    // Añade blanco y negro (o tonos cercanos) al final de la paleta
    this.colores.push(...chroma.scale(['white', 'black']).colors(2));

    console.log(this.colores); // Imprime los colores en la consola
  }


  guardar() {
    this.form.color_primario = this.colores[0];
    this.form.color_secundario = this.colores[1];
    this.form.color_terciario = this.colores[2];
    this.form.blanco = this.colores[3];
    this.form.negro = this.colores[4];
    this.form.font = (<HTMLInputElement>document.getElementById('fuente')).value;
    return this.backend.updateColors(this.form).subscribe(
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
  ajustarFuente(event: Event) {
    let inputElement = event.target as HTMLInputElement;
    let valor = Number(inputElement.value);
    if (valor < 8) {
      valor = 8;
    } else if (valor > 24) {
      valor = 24;
    }
    inputElement.value = valor.toString();
  }



}
