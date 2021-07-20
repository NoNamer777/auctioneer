import { Component } from '@angular/core';

@Component({
  selector: 'auc-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent {

  dateToday = new Date().toLocaleString('en-NL', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
