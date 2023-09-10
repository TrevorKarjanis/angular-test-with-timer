import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NimbleTextFieldModule, NimbleThemeProviderModule } from '@ni/nimble-angular';

import { AppComponent } from './app.component';

describe('AppComponent with fakeAsync', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        FormsModule,
        NimbleTextFieldModule,
        NimbleThemeProviderModule
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    flush();
  }));

  // This does not work, because it will not flush the timers in other fakeAsync zones.
  // afterEach(fakeAsync(() => {
  //   flush();
  // }));

  it('fakeAsync should render a message with the name', fakeAsync(() => {
    fixture.detectChanges();
    flush();

    const name = fixture.componentInstance.name;
    const field = fixture.debugElement.query(By.css('nimble-text-field')).nativeElement;
    expect(field.value).toContain(name);
  }));

  // This test passes, because the timer is flushed in the beforeEach.
  it('fakeAsync with waitForAsync should render a message with the name', waitForAsync(async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const name = fixture.componentInstance.name;
    const field = fixture.debugElement.query(By.css('nimble-text-field')).nativeElement;
    expect(field.value).toContain(name);
  }));
});

describe('AppComponent with waitForAsync', () => {
  let fixture: ComponentFixture<AppComponent>;

  // This function must use waitForAsync or else the call to whenStable on line 74 will fail silently.
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        FormsModule,
        NimbleTextFieldModule,
        NimbleThemeProviderModule
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  }));

  // This test fails, because whenStable waits the duration of the timer. It would otherwise pass.
  it('should render a message with the name', waitForAsync(async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    const name = fixture.componentInstance.name;
    const field = fixture.debugElement.query(By.css('nimble-text-field')).nativeElement;
    expect(field.value).toContain(name);
  }));
});