import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiButton, } from '@taiga-ui/core';
import { Profile } from '../../data/interfaces/profile.interface';



@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButton,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute)

  userId: number = this.route.snapshot.params['id']

  profile = signal<Profile | null>(null)

  ngOnInit() {
    this.profileService.getProfilesFromId(this.userId)
      .subscribe((res) => {
        this.profile.set(res.data)

      })
  }

  isRedacted = signal<boolean>(false)

  form = new FormGroup({
    first_name: new FormControl<string | null>(null, Validators.required),
    last_name: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
  })

  openRedactor() {
    this.isRedacted.set(true)
  }

  closeRedactor() {
    this.isRedacted.set(false)
  }

  onUpdate() {
    if (this.form.valid) {
      // @ts-ignore
      this.profileService.updateProfiles(this.userId, this.form.value)
        .subscribe((res) => {
          this.profile.update(profile => ({ ...profile, ...res }))
          this.closeRedactor()

        })
    }
  }
}
