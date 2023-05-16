import { Component } from '@angular/core';
import { CatalogService } from './services/catalog.service';

@Component({
  selector: 'mb-catalog',
  template: `
    <mb-catalog-form
      [active]="this.service.active"
      (save)="this.service.save($event)"
      (reset)="this.service.reset()"
    >
    </mb-catalog-form>

    <hr>

    <mb-catalog-list
        [devices]="this.service.devices"
        [active]="this.service.active"
        (setActive)="this.service.setActive($event)"
        (delete)="this.service.deleteHandler($event)"
        >
    </mb-catalog-list>
  `,
})
export class CatalogComponent {
  service: CatalogService;
  constructor(service: CatalogService) {
    this.service = service;
    this.service.getAll();
  }
}
