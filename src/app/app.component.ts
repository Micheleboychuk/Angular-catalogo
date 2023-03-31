import { Component } from '@angular/core';

@Component({
  selector: 'mb-root',
  template: `
      <h1> Ciao Mondo! </h1>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
