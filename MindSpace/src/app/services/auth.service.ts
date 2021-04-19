import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with Google
  googleAuth(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers : Google
  async authLogin(provider) {
    try {
      let result = await this.afAuth.auth.signInWithPopup(provider);
      this.setUserData(result.user);
      let idToken = this.getToken(result);
      //TBD: send the idToken to Django server to retreive the JWT token

      this.router.navigate(['/auth/dashboard']);
    } catch (error) {
      window.alert(error);
    }
  }

  // return google auth idToken for the use of Django
  getToken(result) {
    console.log('Credential:', result.credential.idToken);
    return result.credential.idToken;
  }

  // Sign in with email/password
  async signIn(email, password) {
    try {
      let result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(result);
      this.setUserData(result.user, result.user.displayName);
      let idToken = await this.afAuth.auth.currentUser.getIdToken(true);
      //TBD: send the idToken to Django server to retreive the JWT token

      this.router.navigate(['/auth/dashboard']);
    } catch (error) {
      window.alert(error);
    }
  }

  // Sign up with email/password TODO: save user name
  async signUp(username, email, password) {
    try {
      let result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      /* Call the sendVerificaitonMail() function when new user sign
        up and returns promise */
      this.sendVerificationMail();

      this.setUserData(result.user, username);
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Send email verification when new user sign up
  async sendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['auth', 'verify-email-address']);
  }

  // Reset Forgot password
  async forgotPassword(passwordResetEmail) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // Those ends with test.com are created by admin
    return (
      user !== null && (user.emailVerified || user.email.endsWith('test.com'))
    );
  }

  /* Setting up user data when sign in with username/password,
  // sign up with username/password and sign in with social auth
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user, username?) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || username,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['landing']);
  }
}
