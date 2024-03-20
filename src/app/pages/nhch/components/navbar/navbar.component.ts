import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';
import { NavbarItem } from '../../models/navBar.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  navbarItems: NavbarItem[] = [];
  @Output() openSidebar: EventEmitter<NavbarItem> =
    new EventEmitter<NavbarItem>();

  ngOnInit(): void {
    this.getAllNavbarItems();
  }
  constructor(private navbarService: NavBarService) {}

  getAllNavbarItems(): void {
    this.navbarService.getAllNavbarItems().subscribe((navbarItems) => {
      this.navbarItems = navbarItems;
      console.log(this.navbarItems);
    });
  }
  onOpenSideBar(navbarItem: NavbarItem): void {
    this.openSidebar.emit(navbarItem);
  }
}
