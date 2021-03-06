import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from 'src/services/auth/auth-guard.service';
import { AuthService } from 'src/services/auth/auth.service';
import { CharacterInfosComponent } from './character-infos/character-infos.component';
import { CharactersListComponent } from './characters-list/characters-list.component';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    CharacterInfosComponent,
    CharactersListComponent
  ],
  imports: [
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
