import { NgModule , ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Components
import { SharedComponent } from './components/shared/shared.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
//Services
import { AuthService } from './services/auth.service';
//guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    SharedComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthFormComponent
  ]
})
export class SharedModule {
  static forRoot() : ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    };
  }
 }
