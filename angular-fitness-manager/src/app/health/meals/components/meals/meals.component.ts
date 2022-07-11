import { Component, OnInit, OnDestroy , Inject } from '@angular/core';
import { MealsService , Meal } from '../../../shared/services/meals.service';
import { Observable , Subscription , EMPTY } from 'rxjs';
import { Store } from 'store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit , OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;
  constructor(
    @Inject(Store)private store: Store,
    private mealsService : MealsService) { 
    this.subscription = Subscription.EMPTY;
    this.meals$ = EMPTY;
  }

  ngOnInit(): void {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal){
    this.mealsService.removeMeal(event.$key);
  }
}
