import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
          {{active?.id ? "EDIT" : "ADD"}}
        </button>
        <button type="button"
                class="btn btn-warning"
                *ngIf="active"
                (click)="resetHandler(f)"
        > RESET
        </button>
      </div>
    </form>
  `,
  styles: []
})
export class CatalogFormComponent implements OnChanges {

  @Input() active: Device = { };
  @Output() save : EventEmitter<Device> = new EventEmitter<any>();
  @Output() reset : EventEmitter<any> = new EventEmitter<any>();
  // con questa proprieta riesco ad accedere ad una qualsiasi proprieta o anche componente del nostro template.
  // nel caso nostro vogliamo accedere alla template variable reference #f che riferiamento alla form
  // questa ci serve nel metodo ngOnChanges per poter pulire la form
  @ViewChild('f') form!: NgForm;

  // quando un proprieta Input cambia -> questo metodo ngOnChanges viene invocato
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['active'].currentValue);
    if (!changes['active'].currentValue.id) {
      this.form.reset();
    }
  }

  saveHandler(form: NgForm) {
    this.save.emit(form.value);
  }

  resetHandler(form: NgForm) {
    this.reset.emit();
    form.reset();
  }

}
