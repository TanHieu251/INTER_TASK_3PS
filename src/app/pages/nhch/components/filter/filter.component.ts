import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() searchValueChanged: EventEmitter<string> =
    new EventEmitter<string>();

  searchText: string = '';

  onSearch(): void {
    this.searchValueChanged.emit(this.searchText);
    // console.log(this.searchValueChanged);
  }
}
