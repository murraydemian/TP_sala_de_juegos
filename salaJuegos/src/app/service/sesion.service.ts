import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { SesionStartResponse } from '../interface/sesionStartResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private sesionUid : string;
  private sesionStarted : boolean;

  constructor(
    private auth: AngularFireAuth
  ) { }

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
        resolve(sesionEndResponse);
      })
      .catch( (signOutReason) => {
        sesionEndResponse.reason = 'Error on sign out.';
        sesionEndResponse.data = signOutReason;
        rejected(sesionEndResponse);
      });
    });
  }

  Register(){
    
  }
}
