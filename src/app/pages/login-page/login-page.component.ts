import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from "../../data/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  @Output() login = new EventEmitter<void>()

  form = new FormGroup({
    email: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  authService = inject(AuthService)
  router = inject(Router)


  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      this.authService.login(this.form.value)
        .subscribe((res) => {
          this.login.emit()
          this.router.navigateByUrl('/users')
        })
    }
  }

}
