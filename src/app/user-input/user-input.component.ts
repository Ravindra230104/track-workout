import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  userName: string = '';
  workoutType: string = 'Cycling';
  workoutMinutes: number = 0;

  @Output() workoutAdded = new EventEmitter<void>();

  constructor(private dataService: DataService) {}

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes) {
      this.dataService.addWorkout(this.userName, this.workoutType, this.workoutMinutes);
      this.userName = '';
      this.workoutType = 'Cycling';
      this.workoutMinutes = 0;
      this.workoutAdded.emit();
    }
  }
}
