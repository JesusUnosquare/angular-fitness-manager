import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {BehaviorSubject} from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { pluck } from 'rxjs';

import { User } from './app/auth/shared/services/auth.service';
import { Meal } from './app/health/shared/services/meals.service';
import { Workout } from './app/health/shared/services/workouts.service';
import { ScheduleItem } from './app/health/shared/services/schedule.service';

export interface State {
  user: User,
  meals: Meal[],
  selected: any,
  list: any,
  schedule: ScheduleItem[],
  date: Date,
  workouts: Workout[],
  [key: string]: any
}

const state: State = {
  user: {
    email: "",
    uid: "",
    authenticated: false
  },
  meals: [{
    name : "",
    ingredients: [],
    timestamp: 0,
    $key: "",
    $exist: () => false
  }],
  selected: undefined,
  list: undefined,
  schedule: [],
  workouts:[{
    name : "",
    type: "",
    strength: null,
    endurance: null,
    timestamp: 0,
    $key: "",
    $exist: () => false
  }],
  date: new Date()
};

@Injectable({
  providedIn: 'root',
})
export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());
  //private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    //return this.store.pluck(name);
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}