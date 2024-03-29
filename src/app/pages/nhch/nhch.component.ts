import { Component, OnInit } from '@angular/core';
import { NavbarItem } from './models/navBar.model';

@Component({
  selector: 'app-nhch',
  templateUrl: './nhch.component.html',
  styleUrls: ['nhch.component.css'],
})
export class NhchComponent implements OnInit {
  selectedNavbarItem: NavbarItem | null = null;
  searchText: string = '';
  checkedValues: string[] = [];
  isCheckboxChecked: boolean = false;
  popup2Shown: boolean = false;

  ngOnInit(): void {
    this.onPopup2ShownChanged(this.popup2Shown);
    console.log('Popup 2 shown initially:', this.popup2Shown);
  }
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

  // Phương thức để chuyển đổi trạng thái bật/tắt của popup
  onPopup2ShownChanged(popup2Shown: boolean): void {
    if ((popup2Shown = true)) {
      this.popup2Shown = popup2Shown;
      console.log(popup2Shown);
    } else {
      this.popup2Shown = false;
    }
  }
}
