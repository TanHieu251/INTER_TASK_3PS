import { Component } from '@angular/core';
import { NavbarItem } from './models/navBar.model';

@Component({
  selector: 'app-nhch',
  templateUrl: './nhch.component.html',
  styleUrls: ['nhch.component.css'],
})
export class NhchComponent {
  selectedNavbarItem: NavbarItem | null = null;
  searchText: string = '';
  checkedValues: string[] = [];
  isCheckboxChecked: boolean = false;
  onNavbarItemClicked(item: NavbarItem): void {
    this.selectedNavbarItem = item;
    console.log(this.selectedNavbarItem);
  }

  onChecked(checkedValues: string[]): void {
    if (checkedValues && checkedValues.length > 0) {
      this.checkedValues = checkedValues;
    } else {
      this.checkedValues = [];
    }
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    // console.log(searchText);
  }

  onResetFilter(): void {
    this.searchText = '';
    this.checkedValues = [];
    this.isCheckboxChecked = !this.isCheckboxChecked;
  }
}
