import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {SumPipe} from "./sum.pipe";
import {SumLengthPipe} from "./sum.pipe";
import {OrderByPipe} from "./orderBy.pipe";

@NgModule({
  declarations:[SumPipe, SumLengthPipe, OrderByPipe],
  imports:[CommonModule],
  exports:[SumPipe, SumLengthPipe, OrderByPipe]
})

export class MainPipe{}