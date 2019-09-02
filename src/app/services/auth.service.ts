import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userData: Observable<firebase.User>;
  userData: any; // save logged in user data
  defaultURL = '/assets/img/image.png';

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone) {
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', '');
          // JSON.parse(localStorage.getItem('user'));
        }
      });
  }

  /* Sign up*/
  signUp(email: string, password: string) {
    /* this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then(
      resolve => {
        console.log('Successfully signed up!', resolve);
      }).catch(
        error => {
          console.error('Something is wrong', error);
        }
      ); */
      return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
        //  this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        // this.router.navigate(['image', 'list']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.angularFireAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    let user = null;
    if ( localStorage.getItem('user') !== '') {
      user = JSON.parse(localStorage.getItem('user'));
    }
    if (user !== null) { if ( user.email !== null) { user.emailVerified = true; }  }
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Twitter
  TwitterAuth() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  // Sign in with Twitter
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }



  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['image', 'list']);
        });
       this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName:  user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    this.userData = userData;
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  signOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      this.userData = null;
      localStorage.removeItem('user');
      // this.router.navigate(['sign-in']);
    });
  }

}
