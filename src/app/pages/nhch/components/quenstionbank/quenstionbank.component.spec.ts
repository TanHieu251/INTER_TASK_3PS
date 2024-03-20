import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuenstionbankComponent } from './quenstionbank.component';

describe('QuenstionbankComponent', () => {
  let component: QuenstionbankComponent;
  let fixture: ComponentFixture<QuenstionbankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuenstionbankComponent]
    });
    fixture = TestBed.createComponent(QuenstionbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
