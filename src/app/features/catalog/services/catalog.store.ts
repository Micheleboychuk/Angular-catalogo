import { Injectable } from '@angular/core';
import { Device } from '../model/device';

@Injectable({
  providedIn: 'root'
})
export class CatalogStore {
  devices: Device[] = [];
  active: Device = { };

  // iniziale load dei dati
  load(devices: Device[]) {
    this.devices = devices;
  }

  add(device: Device) {
     this.devices.push(device);
     this.active = { };
  }

  edit(device: Device) {
     const index = this.devices.findIndex(d => d.id === this.active?.id);
     this.devices[index] = device;
  }

  delete(device: Device) {
     const index = this.devices.findIndex(d => d.id === device.id);
     this.devices.splice(index, 1);
  }

  reset() {
    this.active = { };
  }

  setActive(device: Device) {
    this.active = device;
  }
}
