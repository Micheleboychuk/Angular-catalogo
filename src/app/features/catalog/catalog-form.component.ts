import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from './model/device';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'mb-catalog-form',
  template: `
    <form #f="ngForm" (submit)="saveHandler(f)">
      <input
        type="text"
        [ngModel]="active?.label"
        name="label"
        required
        class="form-control"
        placeholder="Device Model">
      <input
        type="number"
        [ngModel]="active?.price"
        name="price"
        class="form-control"
        placeholder="Price">

      <div class="btn-group">
        <button type="submit"
                class="btn btn-warning"
                >
          {{active ? "EDIT" : "ADD"}}
        </button>
        <button type="button"
                class="btn btn-warning"
                *ngIf="active"
                (click)="resetHandler(f)"
                > RESET </button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class CatalogFormComponent {

  @Input() active: Device | null = null;
  @Output() save : EventEmitter<Device> = new EventEmitter<any>();
  @Output() reset : EventEmitter<any> = new EventEmitter<any>();

  saveHandler(form: NgForm) {
    this.save.emit(form.value);
    if (!this.active) {
       form.reset();
    }
  }

  resetHandler(form: NgForm) {
    this.reset.emit();
    form.reset();
  }

}
