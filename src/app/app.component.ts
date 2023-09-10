import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nimble-theme-provider theme="light">
      <h1>{{ name }}</h1>
      <p>Start editing to see some magic happen. :)</p>
      <nimble-text-field [(ngModel)]="name">
        Name
      </nimble-text-field>
    </nimble-theme-provider>
  `
})
export class AppComponent implements OnInit {
  name = '';

  public ngOnInit(): void {
    setTimeout(() => {
      this.name = `Angular ${VERSION.major}`;
    }, 5000);
  }
}