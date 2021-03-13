import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import { UserService } from "services/user.service";
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardService } from "app/guards/auth.guard";
import { AuthService } from "services/auth.service";
import { NavbarComponent } from "./navbar/navbar.component";
import { CharactersModule } from "./characters/characters.module";
import { SkillsService } from "services/skills.service";
import { CharactersService } from "services/characters.service";
import { PipesModule } from "./shared/pipes/pipes.module";
import { LobbyComponent } from "./lobby/lobby.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { WSService } from "services/ws.service";
import { environment } from "environments/environment";
import { FighterCardComponent } from "./lobby/fighter-card/fighter-card.component";
import { FightsComponent } from "./fights/fights.component";

const config: SocketIoConfig = {
  url: environment.backendUrl,
  options: {
    reconnection: false,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    LobbyComponent,
    FighterCardComponent,
    FightsComponent,
  ],
  imports: [
    PipesModule,
    CharactersModule,
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CharactersService,
    SkillsService,
    WSService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
