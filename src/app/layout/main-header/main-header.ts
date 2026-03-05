import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader implements OnInit {
  protected readonly theme = signal<'light' | 'dark'>('light');

  private readonly themeStorageKey = 'stylebase-theme';

  ngOnInit(): void {
    const savedTheme = localStorage.getItem(this.themeStorageKey);
    let resolvedTheme: 'light' | 'dark' = 'light';

    if (savedTheme === 'dark' || savedTheme === 'light') {
      resolvedTheme = savedTheme;
    } else if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
      resolvedTheme = 'dark';
    }

    this.applyTheme(resolvedTheme);
  }

  protected toggleTheme(): void {
    const nextTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.theme.set(theme);
    document.documentElement.dataset['theme'] = theme;
    localStorage.setItem(this.themeStorageKey, theme);
  }
}
