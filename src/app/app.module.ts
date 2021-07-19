import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FaIconsModule } from './modules/fa-icons.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FaIconsModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
