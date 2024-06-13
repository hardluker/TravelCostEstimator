import { Component } from '@angular/core';
import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [FlightFormComponent],
  template: `
    <section class="container-fluid">
      <div class="row">
        <div class="col-md-3 mt-2">
          <div class="card border-left-primary shadow h-100 w-100 py-1">
            <form class="card-body">
              <input type="checkbox" name="flight1" /><label class="pl-1"
                >Flight 1</label
              ><br />
              <input type="checkbox" name="flight2" /><label class="pl-1"
                >Flight 2</label
              ><br />
              <input type="checkbox" name="car-rental" /><label class="pl-1"
                >Car Rental</label
              ><br />
              <input type="checkbox" name="hotel" /><label class="pl-1"
                >Hotel</label
              ><br />
            </form>
          </div>
        </div>
        <div class="col-md-3 mt-2">
          <div class="card border-left-primary shadow h-100 w-100 py-2">
            <form class="user p-2">
              <div class="form-group">
                <input
                  class="form-control form-control-user"
                  type="number"
                  placeholder="Markup %"
                />
              </div>
              <div class="form-group pt-3">
                <input
                  class="form-control form-control-user"
                  type="number"
                  placeholder="Additional Costs"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <app-flight-form></app-flight-form>
  `,
  styleUrl: './options.component.css',
})
export class OptionsComponent {}
