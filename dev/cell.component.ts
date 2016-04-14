import {Component, Input, Inject, forwardRef} from 'angular2/core';
import {OnInit} from "angular2/core";
import {AppComponent} from "./app.component";

@Component({
    selector: 'cell',
    template: `
        <div class="empty" 
             [class.close]="choice == 0"       
             [class.circle]="choice == 1"  
        (click)="makeMove()"></div>
    `,
})
export class CellComponent implements OnInit {

    @Input('cell-x') x: number;
    @Input('cell-y') y: number;
    choice: number;

    constructor(@Inject(forwardRef(() => AppComponent)) private _appComponent: AppComponent) { }

    ngOnInit():any {
        this.choice = -1;
    }

    makeMove() {
        if (this.choice != -1) {
            this._appComponent.result = "Wrong move!";
        } else {
            this.choice = this._appComponent.currentActionIndex % 2;
            this._appComponent.currentActionIndex++;
            this._appComponent.positions[ this.x ] [ this.y ] = this.choice;
            if (this.choice % 2 == 0) {
                this._appComponent.result = "O's turn";
            } else {
                this._appComponent.result = "X's turn";
            }
        }

        this._appComponent.checkTTT();
        console.log(this._appComponent.positions);
    }

}
