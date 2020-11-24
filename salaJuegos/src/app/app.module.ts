import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs'; 
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LayoutModule } from '@angular/cdk/layout';
import { RouteButtonComponent } from './component/atom/route-button/route-button.component';
import { TitleComponent } from './component/atom/title/title.component';
import { NavButtonGroupComponent } from './component/molecules/nav-button-group/nav-button-group.component';
import { NavBarComponent } from './component/organisms/nav-bar/nav-bar.component';
import { SideButtonComponent } from './component/atom/side-button/side-button.component';
import { SideBarComponent } from './component/organisms/side-bar/side-bar.component';
import { JuegosButtonComponent } from './component/molecules/juegos-button/juegos-button.component';
import { AnagramaComponent } from './component/juegos/anagrama/anagrama.component';
import { LetterBoxComponent } from './component/atom/letter-box/letter-box.component';

import { HomeComponent } from './pages/home/home.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PiedraPapelTijeraComponent } from './component/juegos/piedra-papel-tijera/piedra-papel-tijera.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component'; 

import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './firebase.config';
import { FormsModule } from '@angular/forms';
import { TatetiComponent } from './component/juegos/tateti/tateti.component';
import { AdivinaComponent } from './component/juegos/adivina/adivina.component';
import { AgilidadComponent } from './component/juegos/agilidad/agilidad.component';
import { MemotestComponent } from './component/juegos/memotest/memotest.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AcercaDeComponent,
    JuegosComponent,
    NotFoundComponent,
    RouteButtonComponent,
    TitleComponent,
    NavButtonGroupComponent,
    NavBarComponent,
    SideButtonComponent,
    SideBarComponent,
    JuegosButtonComponent,
    AnagramaComponent,
    LetterBoxComponent,
    PiedraPapelTijeraComponent,
    LoginComponent,
    RegistroComponent,
    TatetiComponent,
    AdivinaComponent,
    AgilidadComponent,
    MemotestComponent,    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    DragDropModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
