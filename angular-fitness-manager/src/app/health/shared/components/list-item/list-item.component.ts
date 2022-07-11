import { Component, OnInit ,Input, ChangeDetectionStrategy , EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit {

  toggled = false;
  @Input() item: any;
  @Input() key: string="";
  @Output() remove = new EventEmitter<any>();
  constructor() {
    this.item = {
      name : "",
      ingredients: [],
      timestamp: 0,
      $key: "",
      $exist: () => false
    }
   }

  ngOnInit(): void {
  }

  toggle(){
    this.toggled = !this.toggled;
  }

  removeItem(){
    this.remove.emit(this.item);
  }
  getRoute(item: any) {
    return [
      `../${item.ingredients ? 'meals' : 'workouts' }`,
      item.$key
    ];
  }

}
