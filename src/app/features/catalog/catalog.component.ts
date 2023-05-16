import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './model/device';

@Component({
  selector: 'mb-catalog',
  template: `
    <mb-catalog-form
      [active]="active"
      (save)="save($event)"
      (reset)="reset()"
    >
    </mb-catalog-form>

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
  active: Device = { };
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

  add(device: Device) {
    if(device != null) {
      this.http.post<Device>(`http://localhost:3000/devices/`, device)
               .subscribe(result => {
                  this.devices.push(result);
                  this.active = { };
               });
    }
  }

  edit(device: Device) {
    this.http.patch<Device>(`http://localhost:3000/devices/${this.active?.id}`, device)
      .subscribe(res => {
        const index = this.devices.findIndex(d => d.id === this.active?.id);
        this.devices[index] = res;
      })
  }

  setActive(device: Device) {
    this.active = device;
  }

  reset() {
    this.active = { };
  }

  save(device: Device) {
    if (this.active?.id) {
       this.edit(device);
    } else {
      this.add(device);
    }
  }

}
