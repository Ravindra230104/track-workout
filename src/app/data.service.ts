import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private users: { id: number, name: string, workouts: { type: string, minutes: number }[] }[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  constructor() {}

  getUsers(): { id: number, name: string, workouts: { type: string, minutes: number }[] }[] {
    return this.users;
  }

  addWorkout(name: string, type: string, minutes: number) {
    const userIndex = this.users.findIndex(u => u.name === name);

    if (userIndex !== -1) {
      this.users[userIndex].workouts.push({ type, minutes });
    } else {
      this.users.push({
        id: this.users.length + 1,
        name,
        workouts: [{ type, minutes }]
      });
    }
  }
}
