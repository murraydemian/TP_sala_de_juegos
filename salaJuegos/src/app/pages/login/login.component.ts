import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo : string;
  clave : string;

  showing : boolean = false;

  constructor(
    private fire : AngularFirestore,
    private auth : AngularFireAuth,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.showing = true;
  }

  login(){
    this.auth.signInWithEmailAndPassword(this.correo, this.clave).then( foo => {
      localStorage.setItem('useremail', foo.user.email);
      this.router.navigate(['/juegos']);
    });
  }

  limpiar(){

  }

}
