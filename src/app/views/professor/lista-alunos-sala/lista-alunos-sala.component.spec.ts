import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlunosSalaComponent } from './lista-alunos-sala.component';

describe('ListaAlunosSalaComponent', () => {
  let component: ListaAlunosSalaComponent;
  let fixture: ComponentFixture<ListaAlunosSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAlunosSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlunosSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
