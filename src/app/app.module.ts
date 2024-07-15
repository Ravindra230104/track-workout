import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  

import { AppComponent } from './app.component'; 
import { UserInputComponent } from './user-input/user-input.component';  
import { WorkoutListComponent } from './workout-list/workout-list.component';  
  
@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    WorkoutListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,  
   ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
