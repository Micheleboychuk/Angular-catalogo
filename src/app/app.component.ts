import { Component } from '@angular/core';

@Component({
  selector: 'mb-root',
  template: `
    <div class="container mg-3">
         <router-outlet> </router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
