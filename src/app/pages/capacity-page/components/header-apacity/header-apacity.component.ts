import { Component } from '@angular/core';

@Component({
  selector: 'app-header-apacity',
  templateUrl: './header-apacity.component.html',
  styleUrls: ['./header-apacity.component.css'],
})
export class HeaderApacityComponent {
  public value: Date = new Date(2023, 0, 1);
}
