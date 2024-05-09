import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { error } from 'console';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  users: any[] = []; // Variable para almacenar los usuarios
  public error: any = [];


  constructor(private backend: BackendService) { } // Inyecta el servicio de usuarios si lo estás utilizando

  ngOnInit(): void {
    this.getData(); // Llama al método para cargar los usuarios cuando el componente se inicializa
  }

  getData() {
    this.backend.getAllUser().subscribe(
      (data: any) => {
        //console.log(data);
        // Verifica si la respuesta tiene una propiedad 'users'
        if (data && data.users) {
          this.users = data.users; // Asigna la matriz de usuarios a 'this.users'
        } else {
          console.error('No se encontraron usuarios en la respuesta del backend.');
        }
      },
      error => console.log(error)
    );
  }
  
}
