import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [],
  template: `
    <div class="card border-left-primary shadow py-1">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Flight</h6>
      </div>
      <form class="card-body">
        <div class="form-group">
          <label for="departure-airport">Departure Airport</label>
          <input
            id="departure-airport"
            class="form-control form-control-user"
            list="airports"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="arrival-airport">Arrival Airport</label>
          <input
            id="arrival-airport"
            class="form-control form-control-user"
            type="text"
            list="airports"
          />
        </div>
        <div class="form-group">
          <label for="flight-date">Date</label>
          <input
            id="flight-date"
            class="form-control form-control-user"
            type="date"
          />
        </div>
        <div class="user form-group">
          <label for="carrier">Carrier</label>
          <input
            id="carrier"
            class="form-control form-control-user"
            list="carrier-options"
            type="text"
          />
        </div>
        <div class="user form-group">
          <input class="btn btn-primary" type="submit" />
        </div>
      </form>
      <div class="alert alert-primary">Average Cost: $123.56</div>
    </div>

    <datalist id="airports">
      <option value="Columbia, SC - CAE"></option>
      <option value="Nashville, TN - BNA"></option>
    </datalist>
    <datalist id="carrier-options">
      <option value="American Airlines"></option>
      <option value="Delta"></option>
    </datalist>
  `,
  styleUrl: './flight-form.component.css',
})
export class FlightFormComponent {}
