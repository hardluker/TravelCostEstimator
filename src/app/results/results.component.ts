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
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Markup Percentage</th>
                <td>20%</td>
              </tr>
              <tr>
                <th scope="row">Additional Costs</th>
                <td>$0.00</td>
              </tr>
              <tr>
                <th scope="row">Flight 1</th>
                <td>$100.00</td>
              </tr>
              <tr>
                <th scope="row">Flight 2</th>
                <td>$100.00</td>
              </tr>
              <tr>
                <th scope="row">Car Rental</th>
                <td>$100.00</td>
              </tr>
              <tr>
                <th scope="row">Hotel</th>
                <td>$100.00</td>
              </tr>
              <tr>
                <th scope="row">Total</th>
                <td class="font-weight-bold">$480.00</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-success" type="button">Calculate total</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './results.component.css',
})
export class ResultsComponent {}
