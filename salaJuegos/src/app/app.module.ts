import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs'; 

import { HomeComponent } from './pages/home/home.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PiedraPapelTijeraComponent } from './component/juegos/piedra-papel-tijera/piedra-papel-tijera.component'; 





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
   
    
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
