import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladoCriarComponent } from './simulado-criar.component';

describe('SimuladoCriarComponent', () => {
  let component: SimuladoCriarComponent;
  let fixture: ComponentFixture<SimuladoCriarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuladoCriarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
