import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = "";
  constructor(private authService: AuthService, private router: Router) { }

  async loginUser(event: FormGroup){
    const { email, password } = event.value;
    try { 
      await this.authService.loginUser(email , password )
      .then(() =>{
        this.router.navigate(['/']);
      });
    }
    catch (err: any) {
      this.error = err.message;
    }
    //console.log(event.value);
  }
  ngOnInit(): void {
  }

}
