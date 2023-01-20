import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  currentUser = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.uid}`).valueChanges().pipe(
            take(1),
            tap(data => {
              data['id'] = user.uid;
              this.currentUser.next(data);
              localStorage.setItem('user', JSON.stringify(data));
              JSON.parse(localStorage.getItem('user')!);
            })
          );
        } else {
          this.currentUser.next(null);
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
  
          return of(null);
        }
      })
    );
  }
// returnuser(){
//  return this.afAuth.authState.subscribe((user) => {
//     if (user) {
//       this.userData = user;
//       localStorage.setItem('user', JSON.stringify(this.userData));
//       JSON.parse(localStorage.getItem('user')!);
//     } else {
//       localStorage.setItem('user', 'null');
//       JSON.parse(localStorage.getItem('user')!);
//     }
//     return this.userData
//   });
// }
  signUp(credentials) {

    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(data => {
      return this.db.doc(`users/${data.user.uid}`).set({
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        email: data.user.email,
        role: credentials.role,
        permissions: [],
        wallet:0,
        points:0,
        // created: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }

  signIn(credentials): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.user.uid}`).valueChanges().pipe(
            take(1)
          );
        } else {
          return of(null);
        }
      })
    )
  }
generateid(){
  return this.db.createId();
}
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  hasPermissions(permissions: string[]): boolean {
    for (const perm of permissions) {
      if (!this.currentUser.value || !this.currentUser.value.permissions.includes(perm)) {
        return false;
      }
    }
    return true;
  }

  resetPw(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
