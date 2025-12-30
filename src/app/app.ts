import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegistryComponent } from './icons/icon-registry.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, IconRegistryComponent],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('style-base');
}
