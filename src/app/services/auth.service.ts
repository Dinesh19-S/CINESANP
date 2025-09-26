import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from './api.service';
import firebase from 'firebase/compat/app';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private apiService: ApiService
  ) {
    // Initialize user state
    this.initializeUser();
  }

  private initializeUser(): void {
    this.afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || undefined
        };
        this.currentUserSubject.next(user);
      } else {
        this.currentUserSubject.next(null);
        this.apiService.removeToken();
      }
    });
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (credential.user) {
        const token = await credential.user.getIdToken();
        this.apiService.setToken(token);
      }
    } catch (error) {
      throw error;
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      if (credential.user) {
        const token = await credential.user.getIdToken();
        this.apiService.setToken(token);
      }
    } catch (error) {
      throw error;
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string, displayName?: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (credential.user) {
        if (displayName) {
          await credential.user.updateProfile({ displayName });
        }
        const token = await credential.user.getIdToken();
        this.apiService.setToken(token);
      }
    } catch (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.apiService.removeToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}