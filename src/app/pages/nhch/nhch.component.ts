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
  popupShown: boolean = false;
  isComponentDisabled: boolean = false;

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.onPopup2ShownChanged(this.popupShown);
    console.log('Popup 2 shown initially:', this.popupShown);
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
    this.popupShown = popup2Shown;
    this.isComponentDisabled = popup2Shown;
    console.log('This is true or false ?', popup2Shown);
  }
}
