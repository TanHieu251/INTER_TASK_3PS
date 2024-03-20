import { Component } from '@angular/core';
import { NavbarItem } from './models/navBar.model';
import { QuestionBank } from './models/questionBank.model';

@Component({
  selector: 'app-nhch',
  templateUrl: './nhch.component.html',
})
export class NhchComponent {
  selectedNavbarItem: NavbarItem | null = null;
  searchText: string = '';

  onNavbarItemClicked(item: NavbarItem): void {
    this.selectedNavbarItem = item;
    console.log(this.selectedNavbarItem);
  }
  onSearch(searchText: string): void {
    this.searchText = searchText;
    // console.log(searchText);
  }
}
