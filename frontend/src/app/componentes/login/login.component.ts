import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { error } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public form={
    email:'',
    password:null
  }

  public error = null;
  constructor(private backend:BackendService){ }
  ngOnInit(): void {
  }
  submitLogin(){
    return this.backend.login(this.form).subscribe(
      (data: any) => {
        const accessToken: string = data['access_token'];
        console.log(accessToken);
        // Luego puedes guardar el token en localStorage o en una cookie
        this.saveToken(accessToken);
        this.saveEmail(this.form.email);
      },
      error => this.handleError(error)  
    );
  }
  
  handleError(error:any){
    this.error = error.error.error;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  saveEmail(email: string): void {
    localStorage.setItem('email', email);
  }
}
