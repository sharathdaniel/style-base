import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegistryComponent } from './icons/icon-registry.component';
import { IconComponent } from './icons/icon.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, IconRegistryComponent, IconComponent],
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('style-base');
}
