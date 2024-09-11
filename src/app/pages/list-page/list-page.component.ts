import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ResourceService } from '../../data/services/resource.service';
import { GetListRes, ResourcePager, Resource } from '../../data/interfaces/resource.interface';
import { Observable } from 'rxjs';
import { ResourceCardComponent } from '../../common-ui/resource-card/resource-card.component';
import { Router } from '@angular/router';
import { TuiPagination } from '@taiga-ui/kit';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ResourceCardComponent,
    TuiPagination,
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent {
  constructor(
    private resourceService: ResourceService,
    private router: Router,
  ) { }

  resourceList$!: Observable<GetListRes>;
  ngOnInit(): void {
    this.resourceList$ = this.resourceService.getList(1);
  }


  pageIndex: number = 0
  goToPage(index: number): void {
    this.router.navigate(
      ['/'],
      { queryParams: { page: index + 1, } }
    );
    this.pageIndex = index;
    this.resourceList$ = this.resourceService.getList(index + 1);
  }
}
