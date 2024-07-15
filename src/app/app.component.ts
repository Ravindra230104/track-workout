import { Component } from '@angular/core';
import { UserWorkout } from './workout-list/user-workout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workout-tracker';
  refresh: boolean = false;
  selectedUser?: UserWorkout;
  users: UserWorkout[] = [];  

  onWorkoutAdded() {
    this.refresh = !this.refresh;  
  }
}
