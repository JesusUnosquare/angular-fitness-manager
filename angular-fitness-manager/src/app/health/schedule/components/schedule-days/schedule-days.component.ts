import { Component, OnInit , Input, Output , EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent implements OnInit {

  days = ['M','T','W','T','F','S','S'];
  @Input() selected: number = 0;
  @Output() select = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  selectDay(index: number){
    this.select.emit(index);
  }

}
