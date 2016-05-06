import {Component, Injectable} from '@angular/core';
import {OnInit} from "@angular/core";
import {CellComponent} from "./cell.component";

@Component({
    selector: 'my-app',
    template: `
        <div style="text-align:center">
            <h1>Angular 2 Tic Tac Toe</h1>
            <h2 [class.gameover]="gameOver">{{result}}</h2>
            <table style="margin-left: auto; margin-right: auto">
                <tr *ngFor="#x of [0,1,2]">
                    <td *ngFor="#y of [0,1,2]">
                        <cell [cell-x]="x" [cell-y]="y" (makeMove)="checkMove($event)"></cell>
                    </td>
                </tr>         
            </table>
        </div>
    `,
    directives: [CellComponent]
})

export class AppComponent implements OnInit {
    positions: number[][] = [];
    currentActionIndex: number;
    result:    string;
    gameOver:  boolean;
    
    constructor() { }

    ngOnInit():any {
        this.resetBoard();
    }

    checkMove(cellComponent: CellComponent) {
        if (cellComponent.choice != -1) {
            this.result = "Wrong move!";
        } else {
            cellComponent.choice = this.currentActionIndex % 2;
            this.currentActionIndex++;
            this.positions[ cellComponent.x ] [ cellComponent.y ] = cellComponent.choice;
            if (cellComponent.choice % 2 == 0) {
                this.result = "O's turn";
            } else {
                this.result = "X's turn";
            }
        }

        this.checkTTT();
    }

    resetBoard() {
        this.result = 'Game in progress';
        this.currentActionIndex = 0;
        [0,1,2].forEach((i) => {
            this.positions[i] = [];
            [0,1,2].forEach((j) => this.positions[i][j] = -5);
        });
    }

    checkTTT() {
        if (this.currentActionIndex == 9) {
            this.gameOver = true;
            this.result = 'It\'s a tie!';
        }

        this.checkRows();
        this.checkColumns();
        this.checkDiagonals();
    }

    private checkRows() {
        [0, 1, 2].forEach((row) => {
            this.checkResult(this.positions[row].reduce((acc, current) => acc + current, 0));
        })
    }

    private checkColumns() {
        [0, 1, 2].forEach((col) => {
            this.checkResult(this.positions.map(function(value, index) { return value[col]; }).reduce((acc, current) => acc + current, 0));
        });
    }

    private checkDiagonals() {
        if (this.positions[0][0] != -5 &&  this.positions[0][0] == this.positions[1][1] && this.positions[1][1] == this.positions[2][2]) {
            this.result = this.positions[0][0] % 2 == 0 ? 'X won!' : 'O won!';
            this.gameOver = true;
        }
        if (this.positions[2][0] != -5 &&  this.positions[2][0] == this.positions[1][1] && this.positions[1][1] == this.positions[0][2]) {
            this.result = this.positions[2][0] % 2 == 0 ? 'X won!' : 'O won!';
            this.gameOver = true;
        }
    }

    private checkResult(sum: number) {
        if (sum == 0) {
            this.result = 'X won!';
            this.gameOver = true;
        } else if (sum == 3) {
            this.result = 'O won!';
            this.gameOver = true;
        }
    }

}
