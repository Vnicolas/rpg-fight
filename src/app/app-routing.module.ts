import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import {
  AuthGuardService as AuthGuard
} from '../services/auth/auth-guard.service';
import { CharacterUpdateComponent } from './characters/character-update/character-update.component';
import { CharactersListContainerComponent } from './characters/characters-list-container/characters-list-container.component';
import { CharacterResolver } from './resolvers/character.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'characters',
        component: CharactersListContainerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'character-update/:id',
        component: CharacterUpdateComponent,
        resolve: {
          character: CharacterResolver
        },
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full'
      },
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
