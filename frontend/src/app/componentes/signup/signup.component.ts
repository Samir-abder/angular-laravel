import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public form={
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  }
  public error = '';
  constructor(private backend:BackendService){ }
  ngOnInit(): void {

  }
  submitSignup(){
    //console.log(this.form);
    return this.backend.signup(this.form).subscribe(
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


}
