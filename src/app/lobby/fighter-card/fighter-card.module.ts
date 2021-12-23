import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { IconsModule } from "app/icons.module";
import { FighterCardComponent } from "./fighter-card.component";

@NgModule({
  declarations: [FighterCardComponent],
  imports: [CommonModule, IconsModule, PipesModule],
  exports: [FighterCardComponent],
})
export class FighterCardModule {}
