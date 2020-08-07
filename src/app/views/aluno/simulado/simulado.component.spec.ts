import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladoComponent } from './simulado.component';

describe('SimuladoComponent', () => {
  let component: SimuladoComponent;
  let fixture: ComponentFixture<SimuladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
