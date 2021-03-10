import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "../app-routing.module";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CharacterInfosComponent } from "./character-infos/character-infos.component";
import { CharactersListComponent } from "./characters-list/characters-list.component";
import { CharacterUpdateComponent } from "./character-update/character-update.component";
import { CharactersListContainerComponent } from "./characters-list-container/characters-list-container.component";
import { CharacterCreateComponent } from "./character-create/character-create.component";
import { SkillUpdaterComponent } from "./skill-updater/skill-updater.component";
import { PipesModule } from "../shared/pipes/pipes.module";

@NgModule({
  declarations: [
    CharacterInfosComponent,
    CharactersListComponent,
    CharacterUpdateComponent,
    CharactersListContainerComponent,
    CharacterCreateComponent,
    SkillUpdaterComponent,
  ],
  imports: [
    PipesModule,
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
})
export class CharactersModule {}
