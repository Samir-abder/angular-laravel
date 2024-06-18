import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { error } from 'console';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})

export class VideosComponent {
  products!: Product[];

  constructor(private backend: BackendService ) {}

  ngOnInit() {
     this.cargarDatos();
  }

  cargarDatos(){
    this.backend.getAllVideos().subscribe(
      (data: any) => {
        console.log(data);
        // Verifica si la respuesta tiene una propiedad 'users'
        if (data && data.videos) {
          this.products = data.videos; // Asigna la matriz de usuarios a 'this.users'
        } else {
          console.error('No se encontraron usuarios en la respuesta del backend.');
        }
      },
      error => console.log(error)
    );
  }

  getSeverity(product: Product) {
      switch (product.inventoryStatus) {
          case 'INSTOCK':
              return 'success';

          case 'LOWSTOCK':
              return 'warning';

          case 'OUTOFSTOCK':
              return 'danger';

          default:
              return null;
      }
  };
}