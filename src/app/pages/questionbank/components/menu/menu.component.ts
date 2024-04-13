import { Component, OnInit } from '@angular/core';
import { ApiMenuService } from '../../shared/api-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  navBar: any[] = [];
  constructor(private menuSerivce: ApiMenuService) {}

  ngOnInit(): void {
    this.getNavBar();
  }

  getNavBar(): void {
    this.menuSerivce.getNav().subscribe((nav) => {
      this.navBar = nav;
    });
  }
  
}
