import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, RoutesRecognized } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilComponent } from './profil/profil.component';

//videoo
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import { TestComponent } from './test/test.component';
import { ValideComponent } from './valide/valide.component';
import { VideoFixeComponent } from './video-fixe/video-fixe.component';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);

const routes:Routes=[
  {path: 'accueil', component: AccueilComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'login', component:LoginComponent},
  {path: 'profil', component:ProfilComponent},
  {path: 'test', component:TestComponent},
  {path: 'valide', component: ValideComponent},
  {path: 'videoFixe', component: VideoFixeComponent},
  {path: '', redirectTo:'/accueil',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NavbarComponent,
    LoginComponent,
    ProfilComponent,
    TestComponent,
    ValideComponent,
    VideoFixeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //video
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

    FullCalendarModule,

    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
