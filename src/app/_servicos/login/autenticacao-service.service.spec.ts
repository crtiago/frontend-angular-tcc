import { TestBed } from '@angular/core/testing';

import { AutenticacaoServiceService } from './autenticacao-service.service';

describe('AutenticacaoServiceService', () => {
  let service: AutenticacaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
