import { Component, Input, inject } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { TUI_IS_MOBILE } from '@taiga-ui/cdk';
import { TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiBlockDetails } from '@taiga-ui/layout';
import { TuiButton } from '@taiga-ui/core';
import { TuiButtonClose } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiCell } from '@taiga-ui/layout';
import { TuiSurface } from '@taiga-ui/core';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    RouterLink,
    TuiAvatar,
    TuiBlockDetails,
    TuiTitle,
    TuiButton,
    TuiButtonClose,
    TuiCardLarge,
    TuiCell,
    TuiSurface,
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile | null;
  @Input() onDelete?: any;

  protected readonly isMobile = inject(TUI_IS_MOBILE);
}
