import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCheckboxComponent } from './header-checkbox.component';

describe('HeaderCheckboxComponent', () => {
  let component: HeaderCheckboxComponent;
  let fixture: ComponentFixture<HeaderCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCheckboxComponent]
    });
    fixture = TestBed.createComponent(HeaderCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
