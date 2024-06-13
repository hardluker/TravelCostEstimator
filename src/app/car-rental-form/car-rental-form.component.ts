import { Component } from '@angular/core';

@Component({
  selector: 'app-car-rental-form',
  standalone: true,
  imports: [],
  template: `
    <div class="card border-left-primary shadow py-1 h-100">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Car Rental</h6>
      </div>
      <form class="card-body d-flex flex-column flex-grow-1">
        <div class="form-group">
          <label for="pickup-airport">Pickup Airport</label>
          <input
            id="pickup-airport"
            class="form-control form-control-user"
            list="airports"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="pickup-date">Pickup Date</label>
          <input
            id="pickup-date"
            class="form-control form-control-user"
            type="date"
          />
        </div>
        <div class="form-group">
          <label for="dropoff-date">Drop-Off Date</label>
          <input
            id="dropoff-date"
            class="form-control form-control-user"
            type="date"
          />
        </div>
        <div class="user form-group mt-auto d-flex align-content-end">
          <input class="btn btn-primary" type="submit" />
        </div>
      </form>
      <div class="alert alert-primary">Average Cost: $123.56</div>
    </div>

    <datalist id="airports">
      <option value="Columbia, SC - CAE"></option>
      <option value="Nashville, TN - BNA"></option>
    </datalist>
  `,
  styleUrl: './car-rental-form.component.css',
})
export class CarRentalFormComponent {}
