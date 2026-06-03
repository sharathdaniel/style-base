import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type ThemeName = 'light' | 'dark';
type HeroTab = 'colors' | 'spacing' | 'typography';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  imports: [RouterLink],
})
export class Landing implements OnInit, OnDestroy {
  protected readonly currentYear = new Date().getFullYear();
  protected mobileMenuOpen = false;
  protected readonly theme = signal<ThemeName>('light');

  /** Active tab in the hero code window. */
  protected readonly heroTab = signal<HeroTab>('colors');

  private readonly themeStorageKey = 'stylebase-theme';
  private readonly darkQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
  private readonly onSystemThemeChange = (e: MediaQueryListEvent): void => {
    this.applyTheme(e.matches ? 'dark' : 'light', false);
  };

  ngOnInit(): void {
    const savedTheme = localStorage.getItem(this.themeStorageKey);
    let resolvedTheme: ThemeName = 'light';

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

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  protected setTheme(theme: ThemeName): void {
    this.darkQuery.removeEventListener('change', this.onSystemThemeChange);
    this.applyTheme(theme, true);
  }

  protected setHeroTab(tab: HeroTab): void {
    this.heroTab.set(tab);
  }

  private applyTheme(theme: ThemeName, persist: boolean): void {
    this.theme.set(theme);
    document.documentElement.dataset['theme'] = theme;
    if (persist) {
      localStorage.setItem(this.themeStorageKey, theme);
    }
  }
}
