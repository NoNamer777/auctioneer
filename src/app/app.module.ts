import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@modules/app-routing.module';
import { FaIconsModule } from '@modules/fa-icons.module';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@components/mainpage/header/header.component';
import { HomeComponent } from '@components/mainpage/home/home.component';
import { NavBarComponent } from '@components/mainpage/nav-bar/nav-bar.component';
import { Overview1Component } from '@components/offers/overview1/overview1.component';
import { Overview2Component } from '@components/offers/overview2/overview2.component';
import { Detail2Component } from '@components/offers/detail2/detail2.component';
import { Overview3Component } from '@components/offers/overview3/overview3.component';
import { Detail3Component } from '@components/offers/detail3/detail3.component';
import { ErrorComponent } from './components/mainpage/error/error.component';
import { Overview4Component } from './components/offers/overview4/overview4.component';
import { Detail4Component } from './components/offers/detail4/detail4.component';
import { DestroyedListeningComponent } from './components/destroyed-listening/destroyed-listening.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    Overview1Component,
    Overview2Component,
    Detail2Component,
    Overview3Component,
    Detail3Component,
    ErrorComponent,
    Overview4Component,
    Detail4Component,
    DestroyedListeningComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FaIconsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
