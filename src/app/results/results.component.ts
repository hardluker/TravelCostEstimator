import { Component } from '@angular/core';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  template: `
    <div>
      <div class="card border-left-success shadow py-1 mb-5">
        <div class="card-header py-2">
          <h6 class="m-0 font-weight-bold text-success">Results</h6>
        </div>
        <div class="card-body">
          <p>Markup Percentage: 20%</p>
          <p>Additional Costs: $0.00</p>
          <p>Flight 1 Cost: $100.00</p>
          <p>Flight 2 Cost: $100.00</p>
          <p>Car Rental Cost: $100.00</p>
          <p>Hotel Cost: $100.00</p>
          <p class="font-weight-bold">Total Cost: $480.00</p>
          <button class="btn btn-success" type="button">Calculate total</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './results.component.css',
})
export class ResultsComponent {}
