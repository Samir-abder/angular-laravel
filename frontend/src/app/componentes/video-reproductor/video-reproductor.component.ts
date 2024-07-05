import { Component, OnInit, Inject  } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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
  newComment = '';
  comments = [
    { text: 'Este video es genial!', username: 'John Doe', date: '2022-01-01' },
    { text: 'Me encanta este video!', username: 'Jane Doe', date: '2022-01-05' }];


  constructor(private route: ActivatedRoute, private backend: BackendService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uniqueName = params['uniqueName'];
      if (this.uniqueName) {
        this.loadVideoUrl(this.uniqueName);
      }
    });
  }

  get currentUrl() {
    return this.document.defaultView?.location.href;
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

  addComment() {
    const newCommentObj = {
      text: this.newComment,
      username: 'Tu usuario', // Debes reemplazar con el usuario actual
      date: new Date().toISOString()
    };
    this.comments.push(newCommentObj);
    this.newComment = '';
  }
}
