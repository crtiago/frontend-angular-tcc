import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSimuladosComponent } from './lista-simulados.component';

describe('ListaSimuladosComponent', () => {
  let component: ListaSimuladosComponent;
  let fixture: ComponentFixture<ListaSimuladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSimuladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSimuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
