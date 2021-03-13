import { NgModule } from "@angular/core";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import {
  faArrowLeft,
  faCheckCircle,
  faCrown,
  faDotCircle,
  faIdCard,
  faKey,
  faMinus,
  faPlus,
  faSignOutAlt,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faUser,
      faKey,
      faSignOutAlt,
      faCrown,
      faArrowLeft,
      faPlus,
      faMinus,
      faTimes,
      faIdCard,
      faCheckCircle,
      faDotCircle
    );
  }
}
