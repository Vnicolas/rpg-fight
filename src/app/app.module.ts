import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from 'src/services/auth/auth-guard.service';
import { AuthService } from 'src/services/auth/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CharactersModule } from './characters/characters.module';
import { SkillsService } from 'src/services/skills.service';
import { CharactersService } from 'src/services/characters.service';
import { PipesModule } from './shared/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    PipesModule,
    CharactersModule,
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CharactersService,
    SkillsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
