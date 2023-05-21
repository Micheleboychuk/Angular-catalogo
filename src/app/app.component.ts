import { Component } from '@angular/core';

@Component({
  selector: 'mb-root',
  template: `
    <mb-navbar> </mb-navbar>
    <div class="container mt-3">
         <router-outlet> </router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
