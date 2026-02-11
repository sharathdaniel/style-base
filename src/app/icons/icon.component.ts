import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      class="svg-icon"
      focusable="false"
      [attr.role]="ariaLabel() ? 'img' : null"
      [attr.aria-hidden]="ariaLabel() ? null : 'true'"
      [attr.aria-label]="ariaLabel()"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use [attr.href]="'#' + name()"></use>
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<string>();
  /**
   * Accessibility:
   * - Use `ariaLabel` ONLY for standalone / status icons
   * - NEVER use `ariaLabel` when icon is inside a button or link
   */
  readonly ariaLabel = input<string>();
}
