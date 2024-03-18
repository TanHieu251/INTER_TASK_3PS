import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhchComponent } from './nhch.component';

describe('NhchComponent', () => {
  let component: NhchComponent;
  let fixture: ComponentFixture<NhchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhchComponent]
    });
    fixture = TestBed.createComponent(NhchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
