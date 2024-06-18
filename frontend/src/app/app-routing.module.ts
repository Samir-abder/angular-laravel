import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './componentes/main/main.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { ColorPickerComponent } from './componentes/color-picker/color-picker.component';
import { UserVideosComponent } from './componentes/user-videos/user-videos.component';
import { VideosComponent } from './componentes/videos/videos.component';
import { VideoReproductorComponent } from './componentes/video-reproductor/video-reproductor.component';

const routes: Routes = [
  {
    path: '',
    component : MainComponent
  },
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
    component : ProfileComponent,canActivate: [AuthGuard]
  },
  {
    path: 'main',
    component : MainComponent
  },
  {
    path: 'admin',
    component : AdminComponent,canActivate: [AuthGuard]
  },
  {
    path: 'colorpicker',
    component : ColorPickerComponent,canActivate: [AuthGuard]
  },
  {
    path: 'userVideos',
    component : UserVideosComponent
  },
  {
    path: 'videos',
    component : VideosComponent
  },
  {
    path: 'videoReproductor/:uniqueName',
    component : VideoReproductorComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
