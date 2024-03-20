import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-checkbox',
  templateUrl: './header-checkbox.component.html',
  styleUrls: ['./header-checkbox.component.css'],
})
export class HeaderCheckboxComponent {
  @Output() filterStatus: EventEmitter<string> = new EventEmitter<string>();

  filterGetStatus(event: any) {
    if (event?.target.checked) {
      // console.log(event?.target.value);
      this.filterStatus.emit(event?.target.value);
    } else {
      this.filterStatus.emit('');
    }
  }
}
