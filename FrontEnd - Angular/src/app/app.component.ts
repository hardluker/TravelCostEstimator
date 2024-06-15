import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionsComponent } from './options/options.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OptionsComponent],
  template: `<main>
    <header class="brand-name">
      <img
        class="brand-logo"
        src="assets/logo.svg"
        aria-hidden="true"
        alt="logo"
      />
      <h2>Travel Expense Estimator</h2>
    </header>
    <app-options></app-options>
  </main>`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'travel-cost-estimator';
}
