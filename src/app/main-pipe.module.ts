import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {SumPipe} from "./sum.pipe";
import {OrderByPipe} from "./orderBy.pipe";

@NgModule({
  declarations:[SumPipe, OrderByPipe],
  imports:[CommonModule],
  exports:[SumPipe, OrderByPipe]
})

export class MainPipe{}