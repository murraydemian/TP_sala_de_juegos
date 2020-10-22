import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  showing : boolean = false;

  correo : string;
  clave : string;
  nombreUsuario : string;

  constructor(
    private fire : AngularFirestore,
    private auth : AngularFireAuth,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.showing = true;
  }

  registro(){
    this.auth.createUserWithEmailAndPassword(this.correo, this.clave).then( foo => {
      let user = {correo: this.correo, username: this.nombreUsuario};
      this.fire.collection('userinfo').add(user).then( foo2 => {
        this.router.navigate(['/login']);
      });
    });
  }

  limpiar(){

  }

}
