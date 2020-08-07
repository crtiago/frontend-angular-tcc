import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoBaseComponent } from './aluno-base.component';

describe('AlunoBaseComponent', () => {
  let component: AlunoBaseComponent;
  let fixture: ComponentFixture<AlunoBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
