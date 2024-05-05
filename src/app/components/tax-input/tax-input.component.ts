import { Component } from "@angular/core";

@Component({
  selector: "[tax-input]",
  templateUrl: "./tax-input.component.html",
  styleUrls: ["./tax-input.component.scss"],
  standalone: true,
  host: {
    class: "",
  },
})
export class TaxInputComponent {
  public disabled!: boolean;
}
