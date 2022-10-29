import { TestBed } from '@angular/core/testing';

import { AlarmVacunaService } from './alarm-vacuna.service';

describe('AlarmVacunaService', () => {
  let service: AlarmVacunaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmVacunaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
