import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { BackendService } from '../../services/backend.service';
import { Console } from 'console';


// Define la estructura del Producto
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
    selector: 'app-user-videos',
    templateUrl: './user-videos.component.html',
    styleUrls: ['./user-videos.component.css'],
    providers: [MessageService]
    
})
export class UserVideosComponent implements OnInit {
  public form = {
    name: "",
    file: "",
    fileImage: "",
  };
  products!: Product[];

    selectedProduct!: Product;
    visible: boolean = false;
  public previsualizacion: string = ''; // Assign an initial value to the 'previsualizacion' property
  public archivos: any = []
  public previsualizacionImage: string = ''; // Assign an initial value to the 'previsualizacion' property
  public archivosImage: any = []
  public email: string = ''; // Assign an initial value to the 'previsualizacion' property




    showDialog() {
        this.visible = true;
    }

    // Definir datos ficticios directamente en el componente
    mockProducts: Product[] = [
       
    ];

    constructor(private messageService: MessageService, private backend: BackendService) {}

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
    
    

    ngOnInit(): void {
        this.cargarDatos();
      if (typeof localStorage !== 'undefined') { // Comprobar si localStorage está definido
        const emailC = localStorage.getItem('email'); // Obtener el email del localStorage
        if (emailC) {
          this.email =emailC; // Llamar al método getData con el email obtenido
        }
      }
    }
  

    selectProduct(product: Product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    }
    capturarFile(event: any): void {
      const archivoCapturado = event.target.files[0];
      this.form.file = archivoCapturado;
      this.extraerBase64(archivoCapturado).then((video: any) => {
        this.previsualizacion = video.base;
        console.log(video);
      });
      this.archivos.push(archivoCapturado);
    }
  
    extraerBase64 = async (file: any): Promise<any> => {
      try {
        const unsafeURL = window.URL.createObjectURL(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
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
  
    clearVideo(): void {
      this.previsualizacion = '';
      this.archivos = [];
    }

    //miniatura
    capturarFileImage(event: any): any {
      const archivoCapturado = event.target.files[0]
      this.form.fileImage = archivoCapturado;
      this.extraerBase64Image(archivoCapturado).then((imagen: any) => {
        this.previsualizacionImage = imagen.base;
        console.log(imagen);
  
      })
      this.archivosImage.push(archivoCapturado)
      // 
      // console.log(event.target.files);
  
    }
  
  
    extraerBase64Image = async ($event: any) => {
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
      this.previsualizacionImage = '';
      this.archivosImage = [];
    }
    submitVideo() {
      console.log(this.form);
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('video', this.form.file);
      formData.append('name', this.form.name);
      formData.append('miniatura', this.form.fileImage);
      
      console.log(formData.get('miniatura'));
      console.log(formData.get('video'));
    
      return this.backend.submitVideos(formData).subscribe(
        data => console.log('video subido correctamente'),
        error => console.log(error),
      
        
      );
    }
}
