import { Component, OnInit, ChangeDetectionStrategy , forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent ),
  multi: true
};

@Component({
  selector: 'app-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.css'],
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutTypeComponent implements OnInit , ControlValueAccessor {

  value : string="";
  selectors= ['strength','endurance'];
  private onTouch: Function = new Function();
  private onModelChange: Function = new Function();
  
  constructor() { }

  ngOnInit(): void {
  }


  registerOnTouched(fn : Function) {
    this.onTouch = fn;
  }

  registerOnChange(fn : Function) {
    this.onModelChange = fn;
  }

  writeValue(value:string) {
    this.value = value;
  }

  setSelected(value : string){
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}
