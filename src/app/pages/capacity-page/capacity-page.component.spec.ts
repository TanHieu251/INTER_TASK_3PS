import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityPageComponent } from './capacity-page.component';

describe('CapacityPageComponent', () => {
  let component: CapacityPageComponent;
  let fixture: ComponentFixture<CapacityPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapacityPageComponent]
    });
    fixture = TestBed.createComponent(CapacityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
