import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {CellComponent} from "./cell.component";

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, CellComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }