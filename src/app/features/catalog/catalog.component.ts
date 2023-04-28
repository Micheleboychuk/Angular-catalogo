import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './model/device';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'mb-catalog',
  template: `
    <form #f="ngForm" (submit)="save(f)" (reset)="clear(f)">
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
        <button type="submit" class="btn btn-warning"> {{active ? "EDIT" : "ADD"}} </button>
        <button type="reset" class="btn btn-warning"> CLEAR </button>
    </form>

    <hr>

    <span class="card"
         *ngFor="let device of devices"
         (click)="setActive(device)"
         [ngClass]="{'active': device.id === active?.id}"
         >
         {{device.label}}
      <span class="">
          <i class="fa fa-trash" (click)="deleteHandler(device)"></i>
      </span>
    </span>
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

  clear(form: NgForm) {
    this.active=null;
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
