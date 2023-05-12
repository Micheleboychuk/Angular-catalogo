import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './model/device';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'mb-catalog',
  template: `
    <form #f="ngForm" (submit)="save(f)">
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
        <button type="submit" class="btn btn-warning"> {{active ? "EDIT" : "ADD"}} </button>
        <button type="button" *ngIf="active" class="btn btn-warning" (click)="reset(f)"> RESET </button>
      </div>
    </form>

    <hr>
    <mb-catalog-list 
        [devices]="devices"
        [active]="active"
        (setActive)="setActive($event)"
        (delete)="deleteHandler($event)"
        > 
    </mb-catalog-list>
  `,
})
export class CatalogComponent {
  devices: Device[] = [];
  active: Device | null = null;
  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<Device[]>('http://localhost:3000/devices')
      .subscribe(result => this.devices = result);
  }
  deleteHandler(device: Device) {
    this.http.delete(`http://localhost:3000/devices/${device.id}`)
      .subscribe(() => {
        const index = this.devices.findIndex(d => d.id === device.id);
        this.devices.splice(index, 1);
      });
  }

  save(form: NgForm) {
    if(this.active) {
      this.edit(form);
    } else {
      this.add(form);
    }
  }

  reset(form: NgForm) {
    this.active=null;
    form.reset();
  }

  add(form: NgForm) {
    if(form.value.label != null) {
      this.http.post<Device>(`http://localhost:3000/devices/`, form.value)
        .subscribe(result => {
          this.devices.push(result)
        });
    }
  }

  edit(form: NgForm) {
    this.http.patch<Device>(`http://localhost:3000/devices/${this.active?.id}`, form.value)
      .subscribe(res => {
        const index = this.devices.findIndex(d => d.id === this.active?.id);
        this.devices[index] = res;
      })
  }

  setActive(device: Device) {
    this.active = device;
  }
}
