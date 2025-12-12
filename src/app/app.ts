import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconsModule } from './icons/icons.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, IconsModule],
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('style-base');
}
