import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a workout to an existing user', () => {
    const initialUsers = service.getUsers().length;
    service.addWorkout('John Doe', 'Running', 30);  
    expect(service.getUsers().find(u => u.name === 'John Doe')?.workouts.length).toBe(3);
    expect(service.getUsers().length).toBe(initialUsers);  
  });
});
