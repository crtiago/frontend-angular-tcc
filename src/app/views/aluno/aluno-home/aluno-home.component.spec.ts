import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoHomeComponent } from './aluno-home.component';

describe('AlunoHomeComponent', () => {
  let component: AlunoHomeComponent;
  let fixture: ComponentFixture<AlunoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
