import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//guards
import { AuthGuard } from '../auth/shared/guards/auth.guard';
//shared modules
import { SharedModule } from './shared/shared.module';
export const  ROUTES: Routes = [
  { path: 'meals' , canActivate: [AuthGuard] , loadChildren: () => import('./meals/meals.module').then(x => x.MealsModule) },
  { path: 'schedule' , canActivate: [AuthGuard] , loadChildren: () => import('./schedule/schedule.module').then(x => x.ScheduleModule) },
  { path: 'workouts' , canActivate: [AuthGuard] , loadChildren: () => import('./workouts/workouts.module').then(x => x.WorkoutsModule) }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class HealthModule { }
