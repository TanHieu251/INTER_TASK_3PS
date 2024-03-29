import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() searchValueChanged: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() filterReset: EventEmitter<void> = new EventEmitter<void>();
  @Input() disabled: boolean = false;

  searchText: string = '';

  onSearch(): void {
    this.searchValueChanged.emit(this.searchText);
    // console.log(this.searchValueChanged);
  }

  resetFilter(): void {
    this.searchText = '';
    this.filterReset.emit();
  }
}
