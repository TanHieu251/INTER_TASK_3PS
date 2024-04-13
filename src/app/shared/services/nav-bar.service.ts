import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NavbarItem } from '../../pages/nhch/models/navBar.model';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  @Output() onOpenSideBar = new EventEmitter<string>();

  private apiUrl = 'assets/data/data.json';
  constructor(private http: HttpClient) {}

  getNavBarData(): Observable<NavbarItem[]> {
    const dataApi = this.http.get<NavbarItem[]>(this.apiUrl);
    return dataApi;
  }

  getAllNavbarItems(): Observable<NavbarItem[]> {
    const dataapit = this.getNavBarData();
    return dataapit;
  }
  onNavbarButtonClick(name: string): void {
    this.onOpenSideBar.emit(name);
  }
}
