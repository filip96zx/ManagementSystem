import { TestBed } from '@angular/core/testing';

import { ProfilemanagerService } from './profilemanager.service';

describe('ProfilemanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilemanagerService = TestBed.get(ProfilemanagerService);
    expect(service).toBeTruthy();
  });
});
