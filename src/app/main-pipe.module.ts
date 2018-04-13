import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {SumPipe} from "./sum.pipe";
import {SumLengthPipe} from "./sum.pipe";
import {OrderByPipe} from "./orderBy.pipe";
import {FilterByPipe} from "./sum.pipe"

@NgModule({
  declarations:[SumPipe, SumLengthPipe, OrderByPipe, FilterByPipe],
  imports:[CommonModule],
  exports:[SumPipe, SumLengthPipe, OrderByPipe, FilterByPipe]
})

export class MainPipe{}