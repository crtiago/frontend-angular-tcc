import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfBaseComponent } from './prof-base.component';

describe('ProfBaseComponent', () => {
  let component: ProfBaseComponent;
  let fixture: ComponentFixture<ProfBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
