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
  currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  protected readonly theme = signal<ThemeName>('light');

  /** Active tab in the hero code window. */
  protected readonly heroTab = signal<HeroTab>('colors');

  /** Theme applied to the live demo canvas only (visual, independent of page theme). */
  protected readonly demoTheme = signal<ThemeName>('dark');

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

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected toggleTheme(): void {
    this.darkQuery.removeEventListener('change', this.onSystemThemeChange);
    const nextTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme, true);
  }

  protected setHeroTab(tab: HeroTab): void {
    this.heroTab.set(tab);
  }

  protected setDemoTheme(theme: ThemeName): void {
    this.demoTheme.set(theme);
  }

  private applyTheme(theme: ThemeName, persist: boolean): void {
    this.theme.set(theme);
    document.documentElement.dataset['theme'] = theme;
    if (persist) {
      localStorage.setItem(this.themeStorageKey, theme);
    }
  }
}
