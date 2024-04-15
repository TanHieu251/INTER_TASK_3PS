import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { nav, sidebar, child } from 'src/app/pages/questionbank/shared/data/nav';
@Injectable({
  providedIn: 'root',
})
export class ApiMenuService {
  nav = nav;
  sidebar = sidebar;
  child = child;

  constructor() {}

  getNav(): Observable<any[]> {
    return of(this.nav);
  }

  getSidebar(): Observable<any[]> {
    return of(this.sidebar);
  }

  getChild(): Observable<any[]> {
    return of(this.child);
  }
}
