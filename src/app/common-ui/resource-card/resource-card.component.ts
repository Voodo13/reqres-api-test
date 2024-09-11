import { Component, Input } from '@angular/core';
import { Resource } from '../../data/interfaces/resource.interface';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.scss'
})
export class ResourceCardComponent {
  @Input() resource!: Resource;

}
