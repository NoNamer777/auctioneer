import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FaIconsModule } from '@modules/fa-icons.module';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@components/mainpage/header/header.component';
import { HomeComponent } from '@components/mainpage/home/home.component';
import { NavBarComponent } from '@components/mainpage/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
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
