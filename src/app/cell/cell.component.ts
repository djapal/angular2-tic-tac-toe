import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'cell',
  template: `
        <div [ngClass]="{ 'empty': choice == -1, 'close': choice == 0, 'circle': choice == 1}" 
             (click)="emitComponent()"></div>
    `,
})
export class CellComponent {

  @Input('cell-x') x: number;
  @Input('cell-y') y: number;
  @Output() makeMove: EventEmitter<any> = new EventEmitter();
  choice: number;

  ngOnInit():any {
    this.choice = -1;
  }

  emitComponent() {
    this.makeMove.emit(this);
  }

}
