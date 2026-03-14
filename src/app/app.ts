import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegistryComponent } from './icons/icon-registry.component';
import { MainHeader } from './layout/main-header/main-header';
import { Sidebar } from './layout/sidebar/sidebar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, IconRegistryComponent, MainHeader, Sidebar],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('style-base');
}
