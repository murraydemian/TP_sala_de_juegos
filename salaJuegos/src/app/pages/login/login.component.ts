import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SesionService } from '../../service/sesion.service';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo : string;
  clave : string;

  presentToast: boolean = false;
  toastMessage: string = '';

  showing : boolean = false;

  constructor(
    private fire: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private sesion: SesionService,
    private app: AppComponent,
  ) { }

  ngOnInit(): void {
    this.showing = true;
  }
  login(){
    this.app.procesando = true;
    this.sesion.Start(this.correo, this.clave)
    .then( (response) => {
      console.log(this.router.url );
      this.app.navegarHome();
      this.app.verificarSesion();
    })
    .catch( (reason) => {
      //console.log(reason);
      this.presentToast = true;
      this.app.procesando = false;
    });
  }
  loginRapido(){
    this.correo = 'murraydemian@gmail.com';
    this.clave = '123456';
    this.login();
  }
  limpiar(){
    this.correo = '';
    this.clave = '';
  }

}
