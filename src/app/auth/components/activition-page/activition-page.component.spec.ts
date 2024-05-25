import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitionPageComponent } from './activition-page.component';

describe('ActivitionPageComponent', () => {
  let component: ActivitionPageComponent;
  let fixture: ComponentFixture<ActivitionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
