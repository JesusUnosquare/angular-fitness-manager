import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router , RouterModule } from '@angular/router';

//Third party modules
import { AngularFireDatabaseModule  } from "@angular/fire/compat/database";
import { ListItemComponent } from './components/list-item/list-item.component';
//Services
import { MealsService } from './services/meals.service';
import { WorkoutsService } from './services/workouts.service';
import { ScheduleService } from './services/schedule.service';
//Pipes
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService,
        ScheduleService
      ]
    }
  }
}
