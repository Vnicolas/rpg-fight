import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "app/guards/auth.guard";
import { NavbarComponent } from "./navbar/navbar.component";
import { CharactersModule } from "./characters/characters.module";
import { PipesModule } from "./shared/pipes/pipes.module";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { environment } from "environments/environment";
import { FightsComponent } from "./fights/fights.component";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { CharactersService } from "./services/characters.service";
import { SkillsService } from "./services/skills.service";
import { WSService } from "./services/ws.service";
import { IconsModule } from "./icons.module";
import { LobbyModule } from "./lobby/lobby.module";
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
    FightsComponent,
  ],
  imports: [
    IconsModule,
    PipesModule,
    CharactersModule,
    LobbyModule,
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CharactersService,
    SkillsService,
    WSService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
