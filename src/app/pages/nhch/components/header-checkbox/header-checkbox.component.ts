import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-checkbox',
  templateUrl: './header-checkbox.component.html',
  styleUrls: ['./header-checkbox.component.css'],
})
export class HeaderCheckboxComponent {
  @Output() filterStatus: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() checkboxValueChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() isCheckboxChecked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() showSecondPopup: boolean = false;

  ischecked: boolean = false;

  //lay trang thai filter tu checkbox
  filterGetStatus(event: any) {
    const selectedValues: string[] = [];
    const checkboxes = document.querySelectorAll(
      'input[type=checkbox]:checked'
    );
    checkboxes.forEach((checkbox: any) => {
      selectedValues.push(checkbox.value);
    });
    this.filterStatus.emit(selectedValues);
  }

  //phuong thuc goi lai tu parent, reset checkbox

  ngOnChanges(): void {
    this.ischecked = !this.ischecked;
  }

  onCheckboxChange(): void {
    this.ischecked = !this.ischecked;
  }
}
