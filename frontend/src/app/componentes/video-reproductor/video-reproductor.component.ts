import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';

export interface Video {
  id: number;
  title: string;
  url: string; // URL del video
  description: string;
}


@Component({
  selector: 'app-video-reproductor',
  templateUrl: './video-reproductor.component.html',
  styleUrl: './video-reproductor.component.css'
})


export class VideoReproductorComponent implements OnInit {
  previsualizacion: string | ArrayBuffer | null = null;
  archivos: File[] = [];
  uniqueName: string | null = null;
  video: any = {};
  
  constructor(private route: ActivatedRoute, private backend: BackendService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uniqueName = params['uniqueName'];
      if (this.uniqueName) {
        this.loadVideoUrl(this.uniqueName);
      }
    });
  }

  loadVideoUrl(uniqueName: string): void {
    this.backend.getVideoByLink(uniqueName).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 'success' && response.video && response.video.length > 0) {
          this.video = response.video[0];
          this.previsualizacion = 'http://localhost:8000/storage/files/' + this.video.path;
        } else {
          console.error('No se encontró el video en la respuesta del backend.');
        }
      },
      (error) => {
        console.error('Error al cargar el video', error);
      }
    );
  }

  likeVideo(): void {
    // Lógica para incrementar el contador de likes del video
    // Puedes enviar una solicitud al backend para registrar el like
    console.log('Liked!');
  }

  dislikeVideo(): void {
    // Lógica para incrementar el contador de dislikes del video
    // Puedes enviar una solicitud al backend para registrar el dislike
    console.log('Disliked!');
  }
  
  capturarFile(event: any): void {
    const archivoCapturado = event.target.files[0];
    // Puedes almacenar el archivo capturado en tu formulario u otro lugar necesario
    // this.form.file = archivoCapturado;
    
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
}