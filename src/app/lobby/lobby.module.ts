import { NgModule } from "@angular/core";
import { LobbyComponent } from "./lobby.component";
import { FighterCardModule } from "./fighter-card/fighter-card.module";
import { CommonModule } from "@angular/common";
import { NgParticlesModule } from "ng-particles";

@NgModule({
  declarations: [LobbyComponent],
  imports: [CommonModule, NgParticlesModule, FighterCardModule],
  exports: [LobbyComponent],
})
export class LobbyModule {}
