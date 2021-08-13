import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {

  let fixture: ComponentFixture<ErrorComponent>;
  let router: Router;
  let element: HTMLElement;

  const routesMock: Route[] = [
    {
      path: 'error',
      component: ErrorComponent,
    },
    {
      path: '**',
      redirectTo: 'error',
    }
  ];

  function loadComponents(): void {
    fixture = TestBed.createComponent(ErrorComponent);

    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routesMock) ],
      declarations: [ ErrorComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
  });

  it('Should render the path that caused the error page to show up', async () => {
    router.navigate(['test']);

    loadComponents();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector('p')!.innerText.includes(`'/test'`)).toBeTrue();
  });

  it('Should render the path that caused the error page to show up', async () => {
    loadComponents();

    await router.navigate(['test']);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector('p')!.innerText.includes(`'/test'`)).toBeTrue();

    await router.navigate(['another-test']);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector('p')!.innerText.includes(`'/another-test'`)).toBeTrue();
  });

  it('Should not render the path that caused the error page to show up', async () => {
    await router.navigate(['test']);

    loadComponents();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector('p')!.innerText.includes(`'/test'`)).toBeFalse();
  });
});
