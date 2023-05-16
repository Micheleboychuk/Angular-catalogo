import { Component } from '@angular/core';
import { CatalogService } from './services/catalog.service';

@Component({
  selector: 'mb-catalog',
  template: `
    <mb-catalog-form
      [active]="service.active"
      (save)="service.save($event)"
      (reset)="service.reset()"
    >
    </mb-catalog-form>

    <hr>

    <mb-catalog-list
        [devices]="service.devices"
        [active]="service.active"
        (setActive)="service.setActive($event)"
        (delete)="service.deleteHandler($event)"
        >
    </mb-catalog-list>
  `,
})
export class CatalogComponent {
  constructor(public service: CatalogService) {
     service.getAll();
  }
}
