import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  signup(data:any){
    return  this.http.post('http://127.0.0.1:8000/api/signup',data);
  }
  login(data:any){
    return this.http.post('http://127.0.0.1:8000/api/login', data);
  }
  updateUser(data:any){
    return this.http.post('http://127.0.0.1:8000/api/updateUser', data);
  }
  getUser(email: string) {
    // Construir los parámetros de consulta
    const params = new HttpParams().set('email', email);

    // Pasar los parámetros de consulta en la solicitud GET
    return this.http.get('http://127.0.0.1:8000/api/getUser', { params });
  }
}
