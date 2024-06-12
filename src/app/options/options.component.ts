import { Component } from '@angular/core';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  template: `
    <section class="options-container">
      <form class="checkbox-form">
        <label><input type="checkbox" name="flight1" />Flight 1</label><br />
        <label><input type="checkbox" name="flight2" />Flight 2</label><br />
        <label><input type="checkbox" name="carRental" />Car Rental</label
        ><br />
        <label><input type="checkbox" name="hotels" />Hotels</label>
      </form>
      <form class="number-inputs-form">
        <div>
          <label>Markup %<input type="number" /></label>
        </div>
        <div>
          <label>Additional Costs<input type="number" /></label>
        </div>
      </form>
    </section>
  `,
  styleUrl: './options.component.css',
})
export class OptionsComponent {}
