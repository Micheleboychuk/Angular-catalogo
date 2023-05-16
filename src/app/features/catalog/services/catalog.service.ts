import { Inject, Injectable } from '@angular/core';
import { Device } from '../model/device';
import { HttpClient } from '@angular/common/http';
import { CatalogStore } from './catalog.store';

@Injectable({
  //scrivendo cosi, questo servizio lo faccio includere nell app, lo stesso protrei fare includendo nella
  // sezione provider del file app.module.ts
  providedIn: 'root'
})
export class CatalogService {

  constructor(private store: CatalogStore, private http: HttpClient) {}

  getAll() {
    this.http.get<Device[]>('http://localhost:3000/devices')
             .subscribe(result => this.store.load(result));
  }

  deleteHandler(device: Device) {
    this.http.delete(`http://localhost:3000/devices/${device.id}`)
             .subscribe(() => this.store.delete(device));
  }

  add(device: Device) {
    if(device != null) {
      this.http.post<Device>(`http://localhost:3000/devices/`, device)
               .subscribe(result => this.store.add(result));
    }
  }

  edit(device: Device) {
    this.http.patch<Device>(`http://localhost:3000/devices/${this.store.active?.id}`, device)
             .subscribe(res => this.store.edit(res));
  }

  setActive(device: Device) {
      this.store.setActive(device);
  }

  reset() {
    this.store.reset();
  }

  save(device: Device) {
    if (this.store.active?.id) {
      this.edit(device);
    } else {
      this.add(device);
    }
  }
}
