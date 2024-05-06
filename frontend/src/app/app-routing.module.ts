import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './componentes/main/main.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'main',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'signup',
    component : SignupComponent
  },
  {
    path: 'profile',
    component : ProfileComponent//,canActivate: [AuthGuard]
  },
  {
    path: 'main',
    component : MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
