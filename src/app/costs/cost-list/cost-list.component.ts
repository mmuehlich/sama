import { Component, OnInit } from '@angular/core';
import { Cost } from '../cost';
import { CostService } from '../cost.service';

@Component({
  selector: 'cost-list',
  templateUrl: './cost-list.component.html',
  styleUrls: ['./cost-list.component.scss']
})

export class CostListComponent implements OnInit {

  showNewEntry = false;
  currEntry: Cost;
  costs;
  costTopics;

  constructor(private costService: CostService) { 
    this.currEntry = this.getEmpty();
    this.costs = this.costService.getSnapshot();
    this.costTopics = this.costService.getSnapshot()
      .map(c => new Set(c.map(i => i['topic'])));
  }

  ngOnInit() {
  }

  create() {
    if (!this.currEntry.id) {
      this.costService.create(this.currEntry);
    } else {
      this.costService.update(this.currEntry.id, this.currEntry);
    }
    this.currEntry = this.getEmpty();
    this.showNewEntry = false;
  }

  delete(cost: any) {
    if (confirm('Eintrag ' + cost.title + ' löschen?')) {
        this.costService.delete(cost.id);
    }
  }

  newEntry() {
    this.currEntry = this.getEmpty();
    this.showNewEntry = true;
  }

  private getEmpty() {
    return {
      topic: '',
      text: '',
      amount: 0
    };
  }
 
}