import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxInputComponent } from './tax-input.component';

describe('TaxInputComponent', () => {
  let component: TaxInputComponent;
  let fixture: ComponentFixture<TaxInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxInputComponent]
    });
    fixture = TestBed.createComponent(TaxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
