import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<main>
    <header class="brand-name">
      <img
        class="brand-logo"
        src="assets/logo.svg"
        aria-hidden="true"
        alt="logo"
      />
    </header>
  </main>`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'travel-cost-estimator';
}
