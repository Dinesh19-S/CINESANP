import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<firebase.User | null>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.user$ = this.afAuth.authState;
  }

  ngOnInit(): void {}

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}