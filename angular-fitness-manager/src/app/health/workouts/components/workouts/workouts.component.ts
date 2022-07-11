import { Component, OnInit, OnDestroy , Inject } from '@angular/core';
import { WorkoutsService , Workout } from '../../../shared/services/workouts.service';
import { Observable , Subscription , EMPTY } from 'rxjs';
import { Store } from 'store';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  subscription: Subscription;
  constructor(
    @Inject(Store)private store: Store,
    private workoutsService : WorkoutsService) { 
    this.subscription = Subscription.EMPTY;
    this.workouts$ = EMPTY;
  }

  ngOnInit(): void {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout){
    this.workoutsService.removeWorkout(event.$key);
  }
}
