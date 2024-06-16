import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightFormComponent } from '../flight-form/flight-form.component';
import { ResultsComponent } from '../results/results.component';
import { CarRentalFormComponent } from '../car-rental-form/car-rental-form.component';
import { HotelFormComponent } from '../hotel-form/hotel-form.component';

type CostType = 'flight1' | 'flight2' | 'carRental' | 'hotel';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlightFormComponent,
    CarRentalFormComponent,
    HotelFormComponent,
    ResultsComponent,
  ],
  template: `
    <section class="container-fluid">
      <div class="row">
        <div class="col-md-3 mt-2">
          <div class="card border-left-primary shadow h-100 w-100 py-1">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Expenses</h6>
            </div>
            <form class="card-body">
              <input
                type="checkbox"
                [(ngModel)]="showFlight1"
                name="flight1"
              /><label class="pl-1">Flight 1</label><br />
              <input
                type="checkbox"
                [(ngModel)]="showFlight2"
                name="flight2"
              /><label class="pl-1">Flight 2</label><br />
              <input
                type="checkbox"
                [(ngModel)]="showCarRental"
                name="car-rental"
              /><label class="pl-1">Car Rental</label><br />
              <input
                type="checkbox"
                [(ngModel)]="showHotel"
                name="hotel"
              /><label class="pl-1">Hotel</label><br />
            </form>
          </div>
        </div>
        <div class="col-md-3 mt-2">
          <div class="card border-left-primary shadow h-100 w-100 py-1">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Markups</h6>
            </div>
            <form class="card-body p-2">
              <div class="user form-group">
                <label for="markup-percentage">Markup Percentage</label>
                <div class="input-group">
                  <div class="input-group-append">
                    <span class="input-group-text">%</span>
                  </div>
                  <input
                    id="markup-percentage"
                    class="form-control form-control-user"
                    type="number"
                    [(ngModel)]="markupPercentage"
                    name="markupPercentage"
                  />
                </div>
              </div>
              <div class="user form-group">
                <label for="additional-costs">Additional Costs</label>
                <div class="input-group">
                  <div class="input-group-append">
                    <span class="input-group-text">$</span>
                  </div>
                  <input
                    id="additional-costs"
                    class="form-control form-control-user"
                    type="number"
                    [(ngModel)]="additionalCosts"
                    name="additionalCosts"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <section class="container-fluid mt-3">
      <div class="row">
        <div class="col-lg-3 col-md-6 mb-3" *ngIf="showFlight1">
          <app-flight-form
            (averageCostChanged)="updateAverageCost('flight1', $event)"
          ></app-flight-form>
        </div>
        <div class="col-lg-3 col-md-6 mb-3" *ngIf="showFlight2">
          <app-flight-form
            (averageCostChanged)="updateAverageCost('flight2', $event)"
          ></app-flight-form>
        </div>
        <div class="col-lg-3 col-md-6 mb-3" *ngIf="showCarRental">
          <app-car-rental-form
            (averageCostChanged)="updateAverageCost('carRental', $event)"
          ></app-car-rental-form>
        </div>
        <div class="col-lg-3 col-md-6 mb-3" *ngIf="showHotel">
          <app-hotel-form
            (averageCostChanged)="updateAverageCost('hotel', $event)"
          ></app-hotel-form>
        </div>
      </div>
    </section>
    <section class="container-fluid">
      <app-results
        [costs]="costs"
        [markupPercentage]="markupPercentage"
        [additionalCosts]="additionalCosts"
      ></app-results>
    </section>
  `,
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent {
  //Defining default form states
  showFlight1 = true;
  showFlight2 = false;
  showCarRental = true;
  showHotel = true;

  //Defining default costs
  markupPercentage = 20.0;
  additionalCosts = 0.0;

  costs: { [key in CostType]: number } = {
    flight1: 0,
    flight2: 0,
    carRental: 0,
    hotel: 0,
  };

  updateAverageCost(type: CostType, cost: number) {
    console.log('Updating' + 'cost: ' + cost);
    this.costs[type] = cost;
  }
}
