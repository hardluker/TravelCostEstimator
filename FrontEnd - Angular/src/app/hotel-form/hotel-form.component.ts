import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [],
  template: `
    <div class="card border-left-primary shadow py-1 h-100 ">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Hotel</h6>
      </div>
      <form
        class="card-body d-flex flex-column justify-content-between flex-grow-1"
      >
        <div class="form-group">
          <label for="city">City</label>
          <input
            id="city"
            class="form-control form-control-user"
            list="airports"
            type="text"
          />
        </div>
        <div class="form-group mt-auto">
          <label for="checkin-date">Check-In Date</label>
          <input
            id="checkin-date"
            class="form-control form-control-user"
            type="date"
          />
        </div>
        <div class="form-group mt-auto">
          <label for="checkout-date">Check-Out Date</label>
          <input
            id="checkout-date"
            class="form-control form-control-user"
            type="date"
          />
        </div>
        <div class="user form-group mt-auto">
          <input class="btn btn-primary" type="submit" />
        </div>
      </form>
      <div class="alert alert-primary">Average Cost: $123.56</div>
    </div>
  `,
  styleUrl: './hotel-form.component.css',
})
export class HotelFormComponent {}
