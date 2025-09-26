import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RecommendationsComponent } from './pages/recommendations/recommendations.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { TicketsComponent } from './pages/tickets/tickets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }