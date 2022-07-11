import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes , RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
//Components
import { MealsComponent } from './components/meals/meals.component';
import { MealComponent } from './components/meal/meal.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';

export const ROUTES : Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
  { path: ':id', component: MealComponent },
]


@NgModule({
  declarations: [
    MealsComponent,
    MealComponent,
    MealFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class MealsModule { }
