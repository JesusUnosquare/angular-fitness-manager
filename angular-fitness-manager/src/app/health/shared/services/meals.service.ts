import { Injectable , Inject , OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";

import { Store }  from 'store';

import { Observable, tap , EMPTY , of , map } from 'rxjs';
import {  filter } from 'rxjs/operators';

import { AuthService } from '../../../auth/shared/services/auth.service';

export interface Meal {
  name : string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exist: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class MealsService implements OnInit {

  userL : any;
  meals$: Observable<Meal[]>;
  constructor(
    @Inject(Store)private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
    ) {  
        this.meals$=EMPTY;
        this.ngOnInit();
    }
    ngOnInit() :  void{
      (async () => {
        try {
          this.userL = await this.authService.user;
          // this.meals$ = (this.db.list(`meals/${this.userL.uid}`).valueChanges() as Observable<Meal[]>)
          //   .pipe(tap((next: Meal[]) => this.store.set('meals',next)));
          //console.log(this.userL.uid);
          //console.log(this.db.list(`meals/${this.userL.uid}`).snapshotChanges());
          this.meals$ = this.db.list(`meals/${this.userL.uid}`).snapshotChanges()
          .pipe(
            map(actions => {

              this.store.set('meals',
                actions.map(a => {
                    const data : Meal = a.payload.val() as Meal;
                    data.$key=a.payload.key! ;
                    return {  ...data };
                  }));

              return actions.map(a => {
                const data : Meal = a.payload.val() as Meal;
                data.$key=a.payload.key! ;
                return {  ...data };
              });
            })
          );
            //console.log(this.meals$);
        } catch(e) {
          this.userL = { uid:""};
        }
        })(); 
        
     }
     get uid() { 
      return this.userL.uid;
     }

     getMeal(key:string){
      if(!key) return of({});
      return this.store.select<Meal[]>('meals').pipe(filter(Boolean)).pipe(
        map(meals => 
          meals.find((meal: Meal) => meal.$key === key)
        )
      )
     }

     addMeal(meal: Meal){
        return this.db.list(`meals/${this.userL.uid}`).push(meal);
     }

     updateMeal(key : string, meal: Meal) {
      return this.db.object(`meals/${this.userL.uid}/${key}`).update(meal);
     }

     removeMeal(key: string){
        return this.db.list(`meals/${this.userL.uid}`).remove(key);
     }
}
