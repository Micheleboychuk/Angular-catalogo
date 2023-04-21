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
               placeholder="Model"
        >
        <input
               type="number"
               [ngModel]="active?.price"
               name="price"
               class="form-control"
               placeholder="price"
        >
        <button type="submit" class="btn btn-warning"> {{active ? "EDIT" : "ADD"}} </button>
    </form>

    <hr>

    <div class="list-group-item"
         *ngFor="let device of devices"
         (click)="setActive(device)"
         [ngClass]="{'active': device.id === active?.id}"
         >
         {{device.label}}
      <div class="fa-pull-right">
          <i class="fa fa-trash" (click)="deleteHandler(device)"></i>
      </div>
    </div>
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
    console.log(form.value);
    this.add(form);
  }

  add(form: NgForm) {
    this.http.post<Device>(`http://localhost:3000/devices/`, form.value)
      .subscribe(result => {this.devices.push(result)});
  }

  setActive(device: Device) {
    this.active = device;
  }
}
