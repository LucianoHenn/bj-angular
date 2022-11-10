import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService  as AuthGuard  } from './shared/aut-guard-service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent,canActivate: [AuthGuard] },
  {path: 'home', component: HomeComponent},
  {path: 'play', component: PlayComponent , canActivate: [AuthGuard]},
  {path: 'reports',  loadChildren: () => import('./modules/report.module').then(m => m.ReportModule), canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
