import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Meal , MealsService } from '../../../shared/services/meals.service';
import { Observable , Subscription , switchMap , of , EMPTY } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit , OnDestroy {

  meal$: Observable<Meal> = EMPTY;
  subscription: Subscription = Subscription.EMPTY;
  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap(param => this.mealsService.getMeal(param['id']))
    ) as Observable<Meal>;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal){
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event : Meal) {
    const key = this.route.snapshot.params['id'];
    await this.mealsService.updateMeal(key,event);
    this.backToMeals();
  }

  async removeMeal(event : Meal) {
    const key = this.route.snapshot.params['id'];
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
