import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavBarService } from '../../pages/nhch/services/nav-bar.service';
import { NavbarItem } from '../../pages/nhch/models/navBar.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarItems: NavbarItem[] = [];
  @Output() openSidebar: EventEmitter<NavbarItem> =
    new EventEmitter<NavbarItem>();

  // Biến để lưu trữ mục được chọn mặc định
  selectedItem: NavbarItem | null = null;

  ngOnInit(): void {
    this.getAllNavbarItems();
  }

  constructor(private navbarService: NavBarService) {}

  getAllNavbarItems(): void {
    this.navbarService.getAllNavbarItems().subscribe((navbarItems) => {
      // Lọc các mục có name là "Nhân Sự"
      this.navbarItems = navbarItems.filter((item) => item.name === 'Nhân Sự');
      // Kiểm tra nếu có ít nhất một mục được trả về
      if (this.navbarItems.length > 0) {
        // Gọi phương thức mở sidebar và truyền vào navbarItem
        this.onOpenSideBar(this.navbarItems[0]);
      }
    });
  }

  onOpenSideBar(navbarItem: NavbarItem): void {
    this.openSidebar.emit(navbarItem);
  }
}
