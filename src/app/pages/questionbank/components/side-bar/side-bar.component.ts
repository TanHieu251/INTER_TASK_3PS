import { Component, OnInit } from '@angular/core';
import { ApiMenuService } from '../../shared/services/api-menu.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'], // Change styleUrl to styleUrls
})
export class SideBarComponent implements OnInit {
  sideBar: any[] = [];
  child: any[] = [];
  showSub = false;
  currentSidebarItem: any;
  constructor(private menuServices: ApiMenuService) {}

  ngOnInit(): void {
    this.getSideBar();
    this.getChild();
  }

  getSideBar(): void {
    this.menuServices.getSidebar().subscribe((side) => {
      this.sideBar = side;
      console.log(this.sideBar);
    });
  }
  getChild(): void {
    this.menuServices.getChild().subscribe((child) => {
      this.child = child;
      console.log(this.child);
    });
  }
  hasChildItems(sidebarItem: any): boolean {
    return this.child.some((childItem) => childItem.side === sidebarItem.id);
  }

  toggleSub(sidebarItem: any): void {
    if (this.currentSidebarItem === sidebarItem) {
      this.showSub = !this.showSub;
    } else {
      this.showSub = true;
      this.currentSidebarItem = sidebarItem;
    }
  }
}
