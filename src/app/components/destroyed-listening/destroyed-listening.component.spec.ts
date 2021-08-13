import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroyedListeningComponent } from './destroyed-listening.component';

describe('DestroyedListeningComponent', () => {

  let fixture: ComponentFixture<DestroyedListeningComponent>;
  let component: DestroyedListeningComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestroyedListeningComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestroyedListeningComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Should emit when the component gets destroyed', () => {
    spyOn(component['destroyed$'], 'next');

    component.ngOnDestroy();
    fixture.detectChanges();

    expect(component['destroyed$'].next).toHaveBeenCalled();
  });
});
