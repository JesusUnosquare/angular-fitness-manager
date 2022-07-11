import { Component, OnInit , Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from '../../../shared/services/meals.service';
import { Workout } from '../../../shared/services/workouts.service';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {

  private selected: string[] = [];
  @Input() section : any;
  @Input() list: Meal[] |  Workout[] | any = [];
  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.selected = [...this.section.assigned];
  }

  toggleItem(name : string) {
    if(this.exists(name)){
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }

  getRoute(name: string){
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  updateAssign() {
    console.log("update from assigne component");
    console.log(this.section.type);
    console.log(this.selected);
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign(){
    this.cancel.emit();
  }

}
