import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderApacityComponent } from './header-apacity.component';

describe('HeaderApacityComponent', () => {
  let component: HeaderApacityComponent;
  let fixture: ComponentFixture<HeaderApacityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderApacityComponent]
    });
    fixture = TestBed.createComponent(HeaderApacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
