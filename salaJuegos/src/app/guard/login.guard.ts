import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionService } from '../service/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (
    private router: Router,
    private auth: AngularFireAuth,
    private sesion: SesionService,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.sesion.HasUser()){
      this.sesion.Started().then( (sesionStarted) => {
        return sesionStarted;
      }).catch( () => {
        return false;
      });
    } else {
      return this.sesion.Verify();
    }
  }
  
}
