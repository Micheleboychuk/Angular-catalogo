import { Component, Input } from "@angular/core";

@Component({
    selector: 'mb-card',
    template: `
            <div class="card bg-dark mb-3">
                <div 
                    class="card-header text-white"
                    (click)="opened = !opened"> {{title}} </div>
                <div class="card-body" *ngIf="opened"> 
                    <ng-content> </ng-content> 
                </div>
            </div>
    `
})
export class CardComponent {

    @Input() title: string = '';
    opened = false;

}