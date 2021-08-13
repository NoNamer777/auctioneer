import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from '@components/mainpage/error/error.component';
import { HomeComponent } from '@components/mainpage/home/home.component';
import { Detail4Component } from '@components/offers/detail4/detail4.component';
import { Overview1Component } from '@components/offers/overview1/overview1.component';
import { Overview2Component } from '@components/offers/overview2/overview2.component';
import { Overview3Component } from '@components/offers/overview3/overview3.component';
import { Overview4Component } from '@components/offers/overview4/overview4.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'offers',
    children: [
      {
        path: 'overview1',
        component: Overview1Component,
      },
      {
        path: 'overview2',
        component: Overview2Component,
      },
      {
        path: 'overview3',
        component: Overview3Component,
      },
      {
        path: 'overview4',
        component: Overview4Component,
        children: [
          {
            path: ':offerId',
            component: Detail4Component,
          },
        ],
      },
    ],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
