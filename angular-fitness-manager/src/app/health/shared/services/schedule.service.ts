import { Injectable, Inject , OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AuthService } from '../../../auth/shared/services/auth.service';
import { BehaviorSubject , EMPTY , tap , Observable , map, switchMap , Subject , withLatestFrom } from 'rxjs';
import { Store } from 'store';
import { Meal } from './meals.service';
import { Workout } from './workouts.service';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService implements OnInit {


  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$
    .pipe(withLatestFrom(this.section$))
    .pipe(map(([items, section ]: any[] ) => {
        const id = section.data.$key;
        const defaults: ScheduleItem = {
          workouts: [],
          meals: [],
          section: section.section,
          timestamp: new Date(section.day).getTime(),
        };

        const payload = {
          ...(id ? section.data : defaults ),
          ...items
        };

        if(id){
          console.log("checker1");
          console.log(id);
          console.log(payload);
          return this.updateSection(id, payload);
        } else {
          console.log("checker2");
          console.log(payload);
          return this.createSection(payload);
        }
    }));

  selected$ = this.section$
    .pipe(tap((next : any) => this.store.set('selected', next)));

  list$ = this.section$
  .pipe(map((value: any) => this.store.value[value.type]))
  .pipe(tap((next : any) => this.store.set('list', next)));

  userL : any;
  //schedule$: Observable<any[]> = this.date$.do((next: any) => this.store.set('date',next));
  schedule$: Observable<ScheduleItem[]> = this.date$.pipe(tap((next: any) => this.store.set('date',next)))
    .pipe(map((day:any) => {
      const startAt=( new Date(day.getFullYear(), day.getMonth(), day.getDate())).getTime();
      const endAt=( new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1 )).getTime()-1;
      return { startAt, endAt };
    })).pipe(switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt,endAt)))
    .pipe(map((data: any) => {
      const mapped: ScheduleList= {};
      for(const prop of data){
        if(!mapped[prop.section]){
          mapped[prop.section] = prop;
        }
      }
      return mapped;
    }))
    .pipe(tap((next:any) => this.store.set('schedule',next)));
  
  
  constructor(
    @Inject(Store)private store : Store,
    private db: AngularFireDatabase,
    @Inject(AuthService)private authService: AuthService,
  ) { 
    this.ngOnInit();
  }

  ngOnInit():void{
    (async () => {
      try {
        this.userL = await this.authService.user;
      } catch(e) {
        this.userL = { uid:""};
      }
      })(); 
  }

  updateItems(items: string[]){
    console.log("servicio");
    console.log(this.itemList$);
    this.itemList$.next(items);
  }

  updateDate(date : Date){
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  get uid() { 
    console.log(this.userL);
    return this.userL.uid;
  }

  private createSection(payload: ScheduleItem){
    return this.db.list(`schedule/${this.userL.uid}`).push(payload);
  }

  private updateSection(key: string, payload: ScheduleItem){
    return this.db.object(`schedule/${this.userL.uid}/${key}`).update(payload);
  }

  private getSchedule(startAt: number, endAt: number) {
    // return this.db.list(`schedule/${this.uid}`, {
    //   query: {
    //     orderByChild: 'timestamp',
    //     startAt,
    //     endAt
    //   }
    // }).valueChanges();
    return this.db.list(`schedule/${this.uid}`, ref => {
      return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)
      }
    ).valueChanges();
  }
}
