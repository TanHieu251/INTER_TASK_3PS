import { Component, Input, OnInit } from '@angular/core';
import { NavbarItem, SidebarItem } from '../../models/navBar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() selectedNavbarItem: NavbarItem | null = null;

  dropdownStates: { [key: number]: boolean } = {};
  ngOnInit(): void {}

  isDropdownOpen(sidebarItem: SidebarItem): boolean {
    return !!this.dropdownStates[sidebarItem.id];
  }

  toggleDropdown(sidebarItem: SidebarItem): void {
    this.dropdownStates[sidebarItem.id] = !this.dropdownStates[sidebarItem.id];
  }
}
