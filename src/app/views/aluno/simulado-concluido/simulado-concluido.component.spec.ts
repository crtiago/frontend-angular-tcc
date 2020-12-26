import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladoConcluidoComponent } from './simulado-concluido.component';

describe('SimuladoConcluidoComponent', () => {
  let component: SimuladoConcluidoComponent;
  let fixture: ComponentFixture<SimuladoConcluidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuladoConcluidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladoConcluidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
