import { NgModule } from "@angular/core";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const icons: IconDefinition[] = [
  
];

@NgModule({
  imports: [ FontAwesomeModule ],
  exports: [ FontAwesomeModule ],
})
export class FaIconsModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(...icons);
  }
}
