import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { first } from 'rxjs/operators';
import { SesionStartResponse } from '../interface/sesionStartResponse.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private sesionUid : string;
  private sesionStarted : boolean;
  public user;
  public userFireInfo;
  public userEmail;

  constructor(
    private auth: AngularFireAuth,
    private fire: AngularFirestore,
  ) { }

  ngOnInit(){    
    this.auth.authState.pipe(first()).toPromise()
    .then(user => {
      this.sesionStarted = false;
      if (user != null){
        
        this.userEmail = user.email;
        this.user = user;
        this.sesionStarted = true;
        this.getUserFireInfo(user);
        //console.log(user.email);
      }
    })
    .catch( () => {
      this.user = null;
      this.sesionStarted = false;
    });    
  }

  /**
   * 
   * @param email User email
   * @param password User password
   * 
   */
  Start(email: string, password: string){
    let sesionStartResponse : SesionStartResponse = {ok: false, reason: '', data: null};
    return new Promise( (resolve, rejected) => {
      if(typeof email == 'undefined' || email == ''){sesionStartResponse.reason = 'Invalid email.'; rejected(sesionStartResponse)}
      if(typeof password == 'undefined' || password == ''){sesionStartResponse.reason = 'Invalid password.'; rejected(sesionStartResponse)}
      this.auth.signInWithEmailAndPassword(email, password)
      .then( (authResponse) => {
        sesionStartResponse.ok = true;
        sesionStartResponse.data = authResponse.user.uid;
        this.sesionUid = authResponse.user.uid;
        this.sesionStarted = true;
        this.userEmail = email;
        this.getUserFireInfo({email: email});
        resolve(sesionStartResponse);
      })
      .catch( (authReason) => {
        sesionStartResponse.reason = authReason.code ? authReason.code : 'Error on sesion start.';
        rejected(sesionStartResponse);
      });
    });
  }
  
  /**
   * 
   * @param uid User id
   * Verifies if the param uid coincides with the stored uid.
   * If the param is an object, it tries to access the uid property of the object.
   * If the param is null returns a boolean indicating if the sesion was started.
   */
  Verify(uid : string | any = null) : boolean{
    if(uid == null){return this.sesionStarted}
    let uidString : string = '';
    uidString = typeof uid == 'string' ? uid : uid.uid;
    return this.sesionUid == uidString;
  }



  End(){
    let sesionEndResponse : SesionStartResponse = {ok: false, reason: '', data: null};
    return new Promise( (resolve, rejected) => {
      this.auth.signOut()
      .then( (signOutResponse) => {
        this.sesionUid = '';
        this.sesionStarted = false;
        sesionEndResponse.data = signOutResponse;
        sesionEndResponse.ok = true;
        this.userFireInfo = null;
        this.userEmail = null;
        resolve(sesionEndResponse);
      })
      .catch( (signOutReason) => {
        sesionEndResponse.reason = 'Error on sign out.';
        sesionEndResponse.data = signOutReason;
        rejected(sesionEndResponse);
      });
    });
  }

  Started(){
    return new Promise((resolve, rejected) => {
      this.auth.authState.pipe(first()).toPromise()
      .then(user => {
        this.getUserFireInfo(user);
        this.user = user;
        this.sesionStarted = false;
        if (user != null){
          this.sesionStarted = true;
        }
        resolve(this.sesionStarted);
      })
      .catch(error => rejected(false));
    });
  }

  HasUser(){
    return this.user != null;
  }

  async getUserFireInfo(user: any){
    if(user != null){
      let collection = this.fire.collection('userinfo').get();
      await collection.subscribe( obs => {
        obs.docs.map( (doc) => {
          if(user.email == doc.data().correo){
            this.userFireInfo = doc;
          }
        });
      });
    }    
  }

  async updateFireInfo(data){
    this.fire.collection('userinfo').doc(this.userFireInfo.id)
      .set(data).then( foo => {
        this.refreshFireInfo();
      });
  }

  refreshFireInfo(){
    this.getUserFireInfo(this.user);
  }

  Register(){
    
  }
}
