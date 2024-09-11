import { Component, inject, signal } from '@angular/core';
import { TuiPagination } from '@taiga-ui/kit';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    TuiPagination,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  title = 'Пользователи';

  profileService = inject(ProfileService);
  router = inject(Router)
  route = inject(ActivatedRoute)

  profiles = signal<Profile[]>([]);
  pageIndex = signal<number>(0)
  pager: { page: number, total_pages: number } = { page: 1, total_pages: 1 }

  private getData(pageIndex: number) {
    this.profileService.getProfiles(pageIndex)
      .subscribe((res) => {
        const { data, ...pager } = res;
        this.profiles.set(data);
        this.pager = pager;
      })
  }

  ngOnInit() {
    const pageId = Number(this.route.snapshot.queryParamMap.get('page')) || 1;
    this.pageIndex.set(pageId - 1)
    this.getData(pageId)
  }

  goToPage(index: number): void {
    this.router.navigate(
      ['/users'],
      { queryParams: { page: index + 1, } }
    );
    this.pageIndex.set(index);
    this.getData(index + 1)
  }

  deleteUser(id?: number) {
    return () => {
      this.profileService.deleteProfiles(id)
        .subscribe((res) => {
          this.profiles.set(this.profiles().filter(n => n.id !== id));
        })
    }
  }
}
