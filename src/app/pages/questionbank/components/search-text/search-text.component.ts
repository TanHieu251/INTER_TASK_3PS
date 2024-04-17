import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrl: './search-text.component.css',
})
export class SearchTextComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterReset: EventEmitter<void> = new EventEmitter<void>();

  searchText: string = '';

  onSearch(): void {
    this.search.emit(this.searchText);
    // console.log(this.searchText);
  }

  resetFilter(): void {
    this.searchText = '';
    this.filterReset.emit();
  }
}
