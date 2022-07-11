import { Component, OnInit , Input , Output , EventEmitter , OnChanges } from '@angular/core';
import { ScheduleItem , ScheduleList } from '../../../shared/services/schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.css']
})
export class ScheduleCalendarComponent implements OnInit , OnChanges {

  selectedDay: Date = new Date(Date.now());
  selectedDayIndex: number = 0;
  selectedWeek: Date = new Date(Date.now());

  sections = [
    { key: 'morning' , name: 'Morning' },
    { key: 'lunch' , name: 'Lunch' },
    { key: 'evening' , name: 'Evening' },
    { key: 'snacks' , name: 'Snacks and Drinks' },
  ];

  @Input() set date( date : Date | null) {
    if(date === null){
      this.selectedDay = new Date(Date.now());
    }
    else{
      this.selectedDay = new Date(date.getTime());
    }
  }
  private baseSchedule : ScheduleItem = {
    meals: [],
    workouts: [],
    section: "",
    timestamp: 0,
    $key: ""
  }
  @Input() items : ScheduleList | null = {
    morning: this.baseSchedule,
    lunch: this.baseSchedule,
    evening: this.baseSchedule,
    snacks: this.baseSchedule,
    key: ""
  };

  @Output() change = new EventEmitter<Date>();
  @Output() select = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name:string): ScheduleItem{
    return this.items && this.items[name] || {};
  }

  selectSection({type, assigned, data}: any, section: string) {
    const day = this.selectedDay;

    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    });
  }
  
  selectDay(index: number){
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  onChange(weekOffset:number){
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }


  private getToday(date:Date){
    let today = date.getDay() - 1;
    if(today < 0 ) {
      today = 6
    }
    return today
  }

  private getStartOfWeek(date: Date){
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

}
