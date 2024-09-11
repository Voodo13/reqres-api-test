import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { TuiSegmented } from '@taiga-ui/kit';
import { AuthService } from "../../data/services/auth.service";
import { CookieService } from "ngx-cookie-service";
import { IsActiveMatchOptions, Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    TuiSegmented,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  authService = inject(AuthService)
  cookieService = inject(CookieService)
  router = inject(Router)

  @Input({ required: true }) isAuth = false;
  @Output() logut = new EventEmitter<void>();

  onLogout() {
    this.logut.emit();
  }

  options: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };
}
