import { Component } from '@angular/core';
import { NavigationEnd, Router, UrlTree } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { DestroyedListeningComponent } from '@components/destroyed-listening/destroyed-listening.component';

@Component({
  selector: 'auc-error',
  templateUrl: './error.component.html',
  styleUrls: [ './error.component.scss' ],
})
export class ErrorComponent extends DestroyedListeningComponent {

  get navigatedRoute(): string {
    return this._navigatedRoute == null ? '' : this._navigatedRoute;
  }

  private _navigatedRoute: string | null;

  constructor(router: Router) {
    super();

    this.constructPreviousNavigation(router.getCurrentNavigation()?.extractedUrl);

    router.events.pipe(takeUntil(this.destroyed$)).subscribe(navigationEvent => {
      if (navigationEvent instanceof NavigationEnd) {
        this.constructPreviousNavigation(router.getCurrentNavigation()!.extractedUrl);
      }
    });
  }

  private constructPreviousNavigation(extractedUrl: UrlTree | undefined): void {
    if (extractedUrl == null) return;

    const segments = extractedUrl.root.children.primary.segments;
    this._navigatedRoute = '';

    segments.forEach(segment => this._navigatedRoute += `/${segment}`);
  }
}
