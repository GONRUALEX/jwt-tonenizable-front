import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsComponent } from './validations.component';

describe('ValidationsComponent', () => {
  let component: ValidationsComponent;
  let fixture: ComponentFixture<ValidationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
