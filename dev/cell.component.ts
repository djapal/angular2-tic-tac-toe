import {Component, Input, Inject, forwardRef, Output, EventEmitter} from '@angular/core';
import {OnInit} from "@angular/core";
import {AppComponent} from "./app.component";

@Component({
    selector: 'cell',
    template: `
        <div class="empty" 
             [class.close]="choice == 0"       
             [class.circle]="choice == 1"  
             (click)="emitComponent()"></div>
    `,
})
export class CellComponent implements OnInit {

    @Input('cell-x') x: number;
    @Input('cell-y') y: number;
    @Output() makeMove: EventEmitter<any> = new EventEmitter();
    choice: number;

    constructor(@Inject(forwardRef(() => AppComponent)) private _appComponent: AppComponent) { }

    ngOnInit():any {
        this.choice = -1;
    }

    emitComponent() {
        this.makeMove.emit(this);
    }

}
