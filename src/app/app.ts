import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegistryComponent } from './icons/icon-registry.component';
import { MainHeader } from './layout/main-header/main-header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, IconRegistryComponent, MainHeader],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('style-base');
}
