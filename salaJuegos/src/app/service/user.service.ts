import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user;
  public infoReady: boolean = false;

  constructor(
    private fire: AngularFirestore,
    private sesion: SesionService,
  ) { }

  ngOnInit(){
    //this.getUserInfo();
  }

  getUserInfo(){
    this.fire.collection('userinfo').snapshotChanges().subscribe( (collectionDocs: Array<any>) => {
      let len = collectionDocs.length;
      for(let i = 0; i < len; i++){
        if(collectionDocs[i].correo = this.sesion.userEmail){
          this.user = collectionDocs[i];
          this.infoReady = true;

          break;
        }
      }
    });
  }
}
