import { Injectable , Inject , OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";

import { Store }  from 'store';

import { Observable, tap , EMPTY , of , map } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from '../../../auth/shared/services/auth.service';

export interface Workout {
  name : string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exist: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  userL : any;
  workouts$: Observable<Workout[]>;
  constructor(
    @Inject(Store)private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
    ) {  
        this.workouts$=EMPTY;
        this.ngOnInit();
    }
    ngOnInit() :  void{
      (async () => {
        try {
          this.userL = await this.authService.user;
          // this.workouts$ = (this.db.list(`workouts/${this.userL.uid}`).valueChanges() as Observable<Workout[]>)
          //   .pipe(tap((next: Workout[]) => this.store.set('workouts',next)));
          //console.log(this.userL.uid);
          //console.log(this.db.list(`workouts/${this.userL.uid}`).snapshotChanges());
          this.workouts$ = this.db.list(`workouts/${this.userL.uid}`).snapshotChanges()
          .pipe(
            map(actions => {

              this.store.set('workouts',
                actions.map(a => {
                    const data : Workout = a.payload.val() as Workout;
                    data.$key=a.payload.key! ;
                    return {  ...data };
                  }));

              return actions.map(a => {
                const data : Workout = a.payload.val() as Workout;
                data.$key=a.payload.key! ;
                return {  ...data };
              });
            })
          );
            //console.log(this.Workout$);
        } catch(e) {
          this.userL = { uid:""};
        }
        })(); 
        
     }
     get uid() { 
      return this.userL.uid;
     }

     getWorkout(key:string){
      if(!key) return of({});
      return this.store.select<Workout[]>('workouts').pipe(filter(Boolean)).pipe(
        map(workouts => 
          workouts.find((workout: Workout) => workout.$key === key)
        )
      )
     }

     addWorkout(workout: Workout){
        return this.db.list(`workouts/${this.userL.uid}`).push(workout);
     }

     updateWorkout(key : string, workout: Workout) {
      return this.db.object(`workouts/${this.userL.uid}/${key}`).update(workout);
     }

     removeWorkout(key: string){
        return this.db.list(`workouts/${this.userL.uid}`).remove(key);
     }
}
