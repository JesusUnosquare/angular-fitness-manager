import { Component, OnInit , Input , EventEmitter , Output , ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent implements OnInit {

  offset = 0;
  @Output() move = new EventEmitter<number>();
  @Input() selected: Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  moveDate(offset: number){
    this.offset = offset;
    this.move.emit(offset);
  }

}
