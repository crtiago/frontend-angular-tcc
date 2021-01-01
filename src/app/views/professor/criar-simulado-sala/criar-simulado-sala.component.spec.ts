import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarSimuladoSalaComponent } from './criar-simulado-sala.component';

describe('CriarSimuladoSalaComponent', () => {
  let component: CriarSimuladoSalaComponent;
  let fixture: ComponentFixture<CriarSimuladoSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarSimuladoSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarSimuladoSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
