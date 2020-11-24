import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SesionService } from '../../service/sesion.service';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm;

  public correoValido: boolean;
  public claveValida: boolean;
  correo = new FormControl('',Validators.email);
  clave = new FormControl();

  presentToast: boolean = false;
  toastMessage: string = '';

  showing : boolean = false;

  constructor(
    private fire: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private sesion: SesionService,
    private app: AppComponent,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.correo,
      pass: this.clave,
    });
    this.showing = true;
    this.correo.valueChanges.subscribe( data => this.correoChanged(data));
    this.clave.valueChanges.subscribe( data => this.claveChanged(data));
  }
  login(){
    this.app.procesando = true;
    this.sesion.Start(this.correo.value, this.clave.value)
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
    this.correo.setValue('murraydemian@gmail.com');
    this.clave.setValue('123456');
    this.login();
  }
  limpiar(){
    this.correo.setValue('');
    this.clave.setValue('');
  }
  correoChanged(data){
    this.correoValido = this.correo.status == "VALID";
    console.log(this.correoValido);
  }
  claveChanged(data){
    this.claveValida = this.clave.value.length >= 6;
    console.log(this.claveValida);
  }
}
