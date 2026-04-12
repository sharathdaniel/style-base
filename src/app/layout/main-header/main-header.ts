import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader implements OnInit, OnDestroy {
  protected readonly theme = signal<'light' | 'dark'>('light');

  private readonly themeStorageKey = 'stylebase-theme';
  private readonly darkQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
  private readonly onSystemThemeChange = (e: MediaQueryListEvent): void => {
    this.applyTheme(e.matches ? 'dark' : 'light', false);
  };

  ngOnInit(): void {
    const savedTheme = localStorage.getItem(this.themeStorageKey);
    let resolvedTheme: 'light' | 'dark' = 'light';

    if (savedTheme === 'dark' || savedTheme === 'light') {
      resolvedTheme = savedTheme;
    } else {
      if (this.darkQuery.matches) {
        resolvedTheme = 'dark';
      }
      this.darkQuery.addEventListener('change', this.onSystemThemeChange);
    }

    this.applyTheme(resolvedTheme, false);
  }

  ngOnDestroy(): void {
    this.darkQuery.removeEventListener('change', this.onSystemThemeChange);
  }

  protected toggleTheme(): void {
    this.darkQuery.removeEventListener('change', this.onSystemThemeChange);
    const nextTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme, true);
  }

  private applyTheme(theme: 'light' | 'dark', persist: boolean): void {
    this.theme.set(theme);
    document.documentElement.dataset['theme'] = theme;
    if (persist) {
      localStorage.setItem(this.themeStorageKey, theme);
    }
  }
}
