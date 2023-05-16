import { Component } from '@angular/core';
import { CatalogService } from './services/catalog.service';
import { CatalogStore } from './services/catalog.store';

@Component({
  selector: 'mb-catalog',
  template: `
    <mb-catalog-form
      [active]="store.active"
      (save)="actions.save($event)"
      (reset)="actions.reset()"
    >
    </mb-catalog-form>

    <hr>

    <mb-catalog-list
      [devices]="store.devices"
      [active]="store.active"
      (setActive)="actions.setActive($event)"
      (delete)="actions.deleteHandler($event)"
    >
    </mb-catalog-list>
  `,
})
export class CatalogComponent {
  constructor(public actions: CatalogService, public store: CatalogStore) {
     actions.getAll();
  }
}
