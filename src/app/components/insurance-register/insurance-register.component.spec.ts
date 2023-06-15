import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRegisterComponent } from './insurance-register.component';

describe('InsuranceRegisterComponent', () => {
  let component: InsuranceRegisterComponent;
  let fixture: ComponentFixture<InsuranceRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceRegisterComponent]
    });
    fixture = TestBed.createComponent(InsuranceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
