import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

type CostType = 'flight1' | 'flight2' | 'carRental' | 'hotel';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
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
                <td>{{ markupPercentage }}%</td>
              </tr>
              <tr>
                <th scope="row">Additional Costs</th>
                <td>\${{ additionalCosts.toFixed(2) }}</td>
              </tr>
              <tr *ngFor="let cost of costsArray">
                <th scope="row">{{ cost.label }}</th>
                <td>\${{ cost.value.toFixed(2) }}</td>
              </tr>
              <tr>
                <th scope="row">Total</th>
                <td class="font-weight-bold">\${{ totalCost.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-success"
            type="button"
            (click)="calculateTotalCost()"
          >
            Calculate total
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnChanges {
  @Input() costs: { [key in CostType]: number } = {
    flight1: 0,
    flight2: 0,
    carRental: 0,
    hotel: 0,
  };
  @Input() markupPercentage = 0;
  @Input() additionalCosts = 0;

  costsArray: { label: string; value: number }[] = [];
  totalCost = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['costs'] ||
      changes['markupPercentage'] ||
      changes['additionalCosts']
    ) {
      this.calculateCostsArray();
      this.calculateTotalCost();
    }
  }

  calculateCostsArray() {
    this.costsArray = [
      { label: 'Flight 1', value: this.costs.flight1 },
      { label: 'Flight 2', value: this.costs.flight2 },
      { label: 'Car Rental', value: this.costs.carRental },
      { label: 'Hotel', value: this.costs.hotel },
    ].filter((cost) => cost.value > 0);
  }

  calculateTotalCost() {
    this.calculateCostsArray(); // Ensure costsArray is updated
    const baseCost = Object.values(this.costs).reduce(
      (sum, cost) => sum + cost,
      0
    );
    const markupAmount = (this.markupPercentage / 100) * baseCost;
    this.totalCost = baseCost + markupAmount + this.additionalCosts;
  }
}
