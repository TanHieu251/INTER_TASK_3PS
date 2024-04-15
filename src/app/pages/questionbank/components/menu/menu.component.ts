import { Component, OnInit } from '@angular/core';
import { ApiMenuService } from '../../shared/services/api-menu.service';

@Component({
  selector: 'app-menu',

  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  navBar: any[] = [];
  selectedItem: number | null = null;

  constructor(private menuService: ApiMenuService) {}

  ngOnInit(): void {
    this.getNavBar();
  }

  getNavBar(): void {
    this.menuService.getNav().subscribe((nav) => {
      this.navBar = nav;
    });
  }
  selectItem(index: number) {
    this.selectedItem = index;
  }
}
