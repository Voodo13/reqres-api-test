import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { AuthService } from '../../data/services/auth.service';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
  ],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent {
  constructor(public authService: AuthService) {
    this.authService.isAuth$.subscribe(data => this.isAuth = data);
  }

  isAuth: boolean = false

  logout() {
    this.authService.logout();
    this.isAuth = false;
  }
  login() {
    this.isAuth = true;
  }
}
