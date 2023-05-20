import { Component, Input } from '@angular/core';

@Component({
  selector: 'mb-os-icon',
  template: `
          <i class="fa" [ngClass]="{
              'fa-android': os === 'android',
              'fa-apple': os === 'ios'
          }"> </i>
  `,
  styles: [
  ]
})
export class OsIconComponent {

  @Input() os: any;

}
