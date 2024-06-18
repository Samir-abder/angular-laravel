import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './componentes/login/login.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageModule } from 'primeng/image';
import { MainComponent } from './componentes/main/main.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { TableModule } from 'primeng/table';
import { ColorPickerComponent } from './componentes/color-picker/color-picker.component';
import { UserVideosComponent } from './componentes/user-videos/user-videos.component';
// Importa los módulos de PrimeNG
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { VideosComponent } from './componentes/videos/videos.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { VideoReproductorComponent } from './componentes/video-reproductor/video-reproductor.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    MainComponent,
    FooterComponent,
    AdminComponent,
    ColorPickerComponent,
    UserVideosComponent,
    VideosComponent,
    VideoReproductorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    FloatLabelModule,
    AvatarModule,
    AvatarGroupModule,
    BrowserAnimationsModule,
    ImageModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    DialogModule,
    DataViewModule,
    TagModule,
    CommonModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
