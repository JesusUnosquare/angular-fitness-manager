import { Injectable , Inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Store } from 'store';
import { tap } from 'rxjs/operators';
// import 'rxjs/add/operator/do';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth$ = this.af.authState
    .pipe(tap((next:any) => {
      if(!next) {
        this.store.set('user',null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set('user',user);
    }))

  constructor(private af: AngularFireAuth, @Inject(Store) private store : Store) { }

  createUser(email: string, password: string){
    return this.af.createUserWithEmailAndPassword(email,password);
  }

  loginUser(email: string, password: string){
    return this.af.signInWithEmailAndPassword(email,password);
  }

  logoutUser(){
    return this.af.signOut();
  }

  get authState() {
    return this.af.authState;
  }
  get user() {
    return (async () => {
      try {
        return await this.af.currentUser
      } catch(e) {
        return {  email: "",
                  uid:"",
                  authenticated:false }
      }
   })();
  }
}
