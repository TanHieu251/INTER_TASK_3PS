import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html',
  styleUrls: ['./questionbank.component.css'],
})
export class QuestionbankComponent {
  searchText: string = '';

  onSearch(searchText: string): void {
    this.searchText = searchText;
    // console.log(searchText);
  }
  onResetFilter(): void {
    this.searchText = '';
  }
}
