import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladoGeradoComponent } from './simulado-gerado.component';

describe('SimuladoGeradoComponent', () => {
  let component: SimuladoGeradoComponent;
  let fixture: ComponentFixture<SimuladoGeradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuladoGeradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladoGeradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
