import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Workout , WorkoutsService } from '../../../shared/services/workouts.service';
import { Observable , Subscription , switchMap , of , EMPTY } from 'rxjs';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workout$: Observable<Workout> = EMPTY;
  subscription: Subscription = Subscription.EMPTY;
  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap(param => this.workoutsService.getWorkout(param['id']))
    ) as Observable<Workout>;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addWorkout(event: Workout){
    console.log("executing",event);
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event : Workout) {
    const key = this.route.snapshot.params['id'];
    await this.workoutsService.updateWorkout(key,event);
    this.backToWorkouts();
  }

  async removeWorkout(event : Workout) {
    const key = this.route.snapshot.params['id'];
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }

}
