import { ComponentFixture } from "@angular/core/testing";

export async function dispatchEvent<T>(element: HTMLElement, eventName: string, fixture: ComponentFixture<T>): Promise<void> {
  element.dispatchEvent(new Event(eventName));

  fixture.detectChanges();

  return fixture.whenStable();
}
