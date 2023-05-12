import { Component,EventEmitter,Input,Output } from "@angular/core";
import { Device } from '../model/device';

@Component({
    selector: 'mb-catalog-list',
    template: `    
    <span class="card" 
          *ngFor="let device of devices"
          (click)="setActive.emit(device)" 
          [ngClass]="{'active': device.id === active?.id}"
          >
          {{device.label}}
        <span> 
          <i class="fa fa-trash" (click)="delete.emit(device)"></i>
        </span>
    </span>
`
})
export class CatalogListComponent {

@Input() devices: Device[] = [];
@Input() active: Device | null = null;
@Output() setActive: EventEmitter<Device> = new EventEmitter<Device>;
@Output() delete: EventEmitter<Device> = new EventEmitter<Device>;

}