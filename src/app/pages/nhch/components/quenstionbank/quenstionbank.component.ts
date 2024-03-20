import { Component, Input } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { questionBanks } from 'src/assets/data/question';
import { QuestionBank } from '../../models/questionBank.model';

@Component({
  selector: 'app-quenstionbank',
  templateUrl: './quenstionbank.component.html',
  styleUrls: ['./quenstionbank.component.css'],
})
export class QuenstionbankComponent {
  public gridView: GridDataResult | null = null;
  public pageSize = 5;
  public skip = 0;
  public mySelection: string[] = [];
  @Input() searchText: string = '';
  private items: QuestionBank[] = questionBanks;

  constructor() {
    this.loadItems();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  public loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length,
    };
  }
  getSearchTextQuestionBank(): QuestionBank[] {
    if (!this.searchText.trim()) {
      this.loadItems();
      return this.items;
    } else {
      console.log(this.searchText);
      const filteredResults = this.items.filter((item) =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      console.log(filteredResults);
      return filteredResults;
    }
  }
}
