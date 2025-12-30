import { Component } from '@angular/core';
import { IconComponent } from '../../../icons/icon.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {}
