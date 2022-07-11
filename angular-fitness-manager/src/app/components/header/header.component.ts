import { Component, OnInit, Output , Input ,ChangeDetectionStrategy , EventEmitter } from '@angular/core';
import { User } from '../../auth/shared/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Output() logout = new EventEmitter<any>();
  @Input() user : User | null;
  constructor() {
    this.user = {
      email: "",
      uid: "",
      authenticated: false
    }
   }

  ngOnInit(): void {
  }

  logoutUser(){
    this.logout.emit();
  }
}
