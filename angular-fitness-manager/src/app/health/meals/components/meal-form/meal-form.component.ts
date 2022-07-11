import { Component, OnInit , ChangeDetectionStrategy , Output , EventEmitter , Input , OnChanges , SimpleChanges} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Meal } from '../../../shared/services/meals.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnInit , OnChanges {
  
  toggled = false;
  exists = false;

  @Input() meal : Meal = {
    name : "",
    ingredients: [],
    timestamp: 0,
    $key: "",
    $exist: () => false
  };
  @Output() create = new EventEmitter<Meal>();
  @Output() update = new EventEmitter<Meal>();
  @Output() remove = new EventEmitter<Meal>();
  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes:SimpleChanges) {
    if(this.meal && this.meal.name){
      this.exists = true;
      this.emptyIngredients();


      const value = this.meal;
      this.form.patchValue(value);

      if(value.ingredients){
        for(const item of value.ingredients){
          this.ingredients.push(new FormControl(item));
        }
      }

    }
  }
  ngOnInit(): void {
  }
  
  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  emptyIngredients() {
    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }
  addIngredient(){
    this.ingredients.push(new FormControl(''));
  }

  createMeal(){
    if(this.form.valid) {
      this.create.emit(this.form.value as Meal);
    }
  }

  updateMeal() {
    if(this.form.valid) {
      this.update.emit(this.form.value as Meal);
    }
  }



  removeMeal(){
    this.remove.emit(this.form.value as Meal);
  }

  removeIngredient(index : number){
    this.ingredients.removeAt(index);
  }

  toggle() {
    this.toggled= !this.toggled;
  }
}
