import { Component, OnInit , Input , Output , EventEmitter , ChangeDetectionStrategy } from '@angular/core';
import { ScheduleItem } from '../../../shared/services/schedule.service';
import { EMPTY } from 'rxjs';


@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSectionComponent implements OnInit {

  @Input() name : string="";
  @Input() section: ScheduleItem = { meals: [],
    workouts: [],
    section: "",
    timestamp: 0,
    $key: ""};
  @Output() select = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }


  onSelect(type: string, assigned: any[] = []) {
    const data = this.section;
    this.select.emit({type,assigned,data});
  }

}
