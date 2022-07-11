import { Component , Inject , OnInit, OnDestroy} from '@angular/core';
import { Store } from 'store';
import { AuthService , User } from './auth/shared/services/auth.service';
import { Observable , Subscription , EMPTY } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-fitness-manager';
  user$: Observable<User>;
  subscription: Subscription;
  constructor(
    private authservice: AuthService,
    @Inject(Store) private store: Store,
    private router : Router
  ) {
    this.subscription = Subscription.EMPTY;
    this.user$ = EMPTY;
  }
  ngOnInit() : void {
    this.subscription = this.authservice.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  async onLogout(){
    await this.authservice.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
