import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Overview1Component } from './overview1.component';

describe('Overview1Component', () => {

  let fixture: ComponentFixture<Overview1Component>;

  let component: Overview1Component;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Overview1Component ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview1Component);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    component.ngOnInit();

    fixture.detectChanges();
  });

  it('Should render 8 randomly generated Offers', () => {
    const table: HTMLTableElement | null = element.querySelector('table');

    expect(table!.getElementsByTagName('tr').length).toBe(9);
  });

  it('Should add a new randomly generated Offer on button click', waitForAsync(() => {
    let table: HTMLTableElement | null = element.querySelector('table');
    const addOfferButton: HTMLButtonElement | null = element.querySelector('button');

    expect(table!.getElementsByTagName('tr').length).toBe(9);

    addOfferButton!.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      table = element.querySelector('table');

      expect(table!.getElementsByTagName('tr').length).toBe(10);
    });
  }));
});
