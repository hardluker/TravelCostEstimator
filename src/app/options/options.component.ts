import { Component } from '@angular/core';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  template: `
    <section class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="card border-left-primary shadow h-100 w-100 py-1">
            <form class="card-body">
              <label><input type="checkbox" name="flight1" />Flight 1</label
              ><br />
              <label><input type="checkbox" name="flight2" />Flight 2</label
              ><br />
              <label><input type="checkbox" name="carRental" />Car Rental</label
              ><br />
              <label><input type="checkbox" name="hotels" />Hotels</label>
            </form>
          </div>
        </div>
        <div class="col-md-3">
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
  `,
  styleUrl: './options.component.css',
})
export class OptionsComponent {}
