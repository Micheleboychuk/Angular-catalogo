import { Inject, Injectable } from '@angular/core';
import { Device } from '../model/device';
import { HttpClient } from '@angular/common/http';

@Injectable({
  //scrivendo cosi, questo servizio lo faccio includere nell app, lo stesso protrei fare includendo nella
  // sezione provider del file app.module.ts
  providedIn: 'root'
})
export class CatalogService {
  devices: Device[] = [];
  active: Device = { };
  constructor(private http: HttpClient) {}

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
