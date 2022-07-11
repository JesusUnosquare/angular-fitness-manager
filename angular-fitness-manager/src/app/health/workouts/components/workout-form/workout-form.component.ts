import { Component, OnInit , ChangeDetectionStrategy , Output , EventEmitter , Input , OnChanges , SimpleChanges} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Workout } from '../../../shared/services/workouts.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  
  toggled = false;
  exists = false;

  @Input() workout : Workout = {
    name : "",
    type: "",
    strength: null,
    endurance: null,
    timestamp: 0,
    $key: "",
    $exist: () => false
  };
  @Output() create = new EventEmitter<Workout>();
  @Output() update = new EventEmitter<Workout>();
  @Output() remove = new EventEmitter<Workout>();
  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      reps: 0,
      sets:0,
      weight:0
    }),
    endurance: this.fb.group({
      distance:0,
      duration:0
    })
  });
  constructor(
    private fb: FormBuilder
  ) { }
  
  ngOnInit(): void {
  }

  get placeholder() {
    return `
    e.g. ${this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'}`;
  }
  
  ngOnChanges(changes:SimpleChanges) {
    if(this.workout && this.workout.name){
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value);

    }
  }
  
  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }
  
  createWorkout(){
    if(this.form.valid) {
      this.create.emit(this.form.value as Workout);
    }
  }

  updateWorkout() {
    if(this.form.valid) {
      this.update.emit(this.form.value as Workout);
    }
  }

  removeWorkout(){
    this.remove.emit(this.form.value as Workout);
  }


  toggle() {
    this.toggled= !this.toggled;
  }
}
