import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladoPersonalizadoComponent } from './simulado-personalizado.component';

describe('SimuladoPersonalizadoComponent', () => {
  let component: SimuladoPersonalizadoComponent;
  let fixture: ComponentFixture<SimuladoPersonalizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuladoPersonalizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladoPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
