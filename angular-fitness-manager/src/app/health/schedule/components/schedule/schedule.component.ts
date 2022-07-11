import { Component, OnInit , OnDestroy , Inject } from '@angular/core';
import { Observable , Subscription , EMPTY } from 'rxjs';
import { ScheduleService , ScheduleItem } from '../../../shared/services/schedule.service';
import { Meal , MealsService } from '../../../shared/services/meals.service';
import { Workout , WorkoutsService } from '../../../shared/services/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit , OnDestroy {

  open = false;

  schedule$: Observable<ScheduleItem[]> = EMPTY;
  selected$: Observable<any> = EMPTY;
  list$: Observable<Meal[] | Workout[]> = EMPTY;
  date$ : Observable<Date> =  EMPTY;
  subscriptions : Subscription[] = [];
  constructor(
    private scheduleService : ScheduleService,
    @Inject(MealsService)private mealsService : MealsService,
    @Inject(WorkoutsService)private workoutsService : WorkoutsService,
    @Inject(Store)private store : Store
  ) { }

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
    ];
  }

  changeDate(date: Date){
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  closeAssign() {
    this.open= false;
  }
  assigItem(items : string[]) {
    console.log("assign Item from schedule component");
    console.log(items);
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

}
