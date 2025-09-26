import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      try {
        await this.afAuth.signInWithEmailAndPassword(email, password);
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      } catch (error: any) {
        this.snackBar.open(error.message, 'Close', { duration: 5000 });
      } finally {
        this.loading = false;
      }
    }
  }

  async loginWithGoogle(): Promise<void> {
    this.loading = true;
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
      this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
      this.router.navigate(['/']);
    } catch (error: any) {
      this.snackBar.open(error.message, 'Close', { duration: 5000 });
    } finally {
      this.loading = false;
    }
  }
}