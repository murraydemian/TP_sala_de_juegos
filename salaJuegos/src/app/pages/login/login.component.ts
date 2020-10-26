import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SesionService } from '../../service/sesion.service';


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
    private fire : AngularFirestore,
    private auth : AngularFireAuth,
    private router : Router,
    private sesion : SesionService,
  ) { }

  ngOnInit(): void {
    this.showing = true;
  }
  login(){
    this.sesion.Start(this.correo, this.clave)
    .then( (response) => {
      console.log(this.router.url );
      this.router.navigate(['/home']);
    })
    .catch( (reason) => {
      console.log(reason);
      this.presentToast = true;
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
