import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { UserWorkout } from './user-workout.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit, OnChanges {
  @Input() refresh?: boolean;

  searchTerm: string = '';
  filterType: string = '';
  workoutTypes: string[] = ['Cycling', 'Swimming', 'Yoga', 'Running'];
  displayedWorkouts: UserWorkout[] = [];
  allWorkouts: UserWorkout[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  itemsPerPageOptions: number[] = [3, 5, 10];
  totalPagesArray: number[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refresh'] && !changes['refresh'].firstChange) {
      this.fetchData();
    }
  }

  fetchData() {
    this.allWorkouts = this.dataService.getUsers();
    this.updatePagination();
  }

  filterWorkouts() {
    let filtered = this.allWorkouts;

    if (this.searchTerm) {
      filtered = filtered.filter(workout =>
        workout.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterType) {
      filtered = filtered.filter(workout =>
        workout.workouts.some(w => w.type === this.filterType)
      );
    }

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages); // Ensure current page is within bounds
    this.updatePaginationNumbers();
    this.updatePage();
  }

  updatePagination() {
    this.filterWorkouts();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedWorkouts = this.filteredWorkouts().slice(startIndex, startIndex + this.itemsPerPage);
    this.updatePaginationNumbers();
  }

  updateItemsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value, 10);
    this.currentPage = 1; // Reset to the first page when changing items per page
    this.updatePagination();
  }

  getTotalMinutes(workouts: { type: string, minutes: number }[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  filteredWorkouts(): UserWorkout[] {
    let filtered = this.allWorkouts;

    if (this.searchTerm) {
      filtered = filtered.filter(workout =>
        workout.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterType) {
      filtered = filtered.filter(workout =>
        workout.workouts.some(w => w.type === this.filterType)
      );
    }

    return filtered;
  }

  updatePaginationNumbers() {
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}

 
 

  
