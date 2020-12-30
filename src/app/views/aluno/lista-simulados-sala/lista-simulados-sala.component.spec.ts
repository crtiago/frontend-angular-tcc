import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSimuladosSalaComponent } from './lista-simulados-sala.component';

describe('ListaSimuladosSalaComponent', () => {
  let component: ListaSimuladosSalaComponent;
  let fixture: ComponentFixture<ListaSimuladosSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSimuladosSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSimuladosSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
