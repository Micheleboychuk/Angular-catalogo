import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './model/device';

@Component({
  selector: 'mb-catalog',
  template: `
    <div class="list-group-item"
         *ngFor="let device of devices">
      {{device.label}}
      <div class="pull-right">
        <i class="fa fa-trash" (click)="deleteHandler(device)"></i>
      </div>
    </div>
  `,
  styles: []

})
export class CatalogComponent {
  devices: Device[] = [];
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
}
