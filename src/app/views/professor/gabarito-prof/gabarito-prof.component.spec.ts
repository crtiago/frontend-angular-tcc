import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GabaritoProfComponent } from './gabarito-prof.component';

describe('GabaritoProfComponent', () => {
  let component: GabaritoProfComponent;
  let fixture: ComponentFixture<GabaritoProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GabaritoProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GabaritoProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
