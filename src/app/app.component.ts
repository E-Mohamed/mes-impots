import { Component, OnInit } from "@angular/core";

interface MarginalTaxRate {
  min: number;
  max: number;
  percent: number;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  donUF: number = 0;
  donUD: number = 0;
  nbPart: number = 1;
  revNet: number = 0;
  impot: number = 0;
  isMarried: boolean = false;
  quotientFamilial: number = 0;
  childCount: number = 0;
  readonly tranche: Map<string, MarginalTaxRate> = new Map();
  private trancheIterator: IterableIterator<[string, MarginalTaxRate]>;
  private nbPartBase: number = 1;

  constructor() {
    this.setTranche();
    this.trancheIterator = this.tranche.entries();
  }
  public ngOnInit(): void {}

  public onNbChild(nbChild: number): void {
    this.childCount = nbChild;
    if (nbChild <= 2) {
      this.nbPart = this.nbPartBase + nbChild * 0.5;
      return;
    }
    this.nbPart = this.nbPartBase + nbChild - 1;
  }

  public calculate(): void {
    this.impot = 0;
    this.quotientFamilial = this.revNet / this.nbPart;
    this.calculByTranche(
      this.trancheIterator.next().value[1],
      this.quotientFamilial,
    );
    this.impot = this.impot * this.nbPart;

    // TODO: should be in a private function
    // tax allowance from UF UD
    let totalAllowance = 0;
    // UD allowance
    totalAllowance = this.donUD * 0.75;
    const ufAllowance = this.donUF * 0.66;
    const reduction = totalAllowance + ufAllowance; // TODO:  verifier si la limite de 20% est uniquement sur uf ou sur les deux
    const limit = this.revNet * 0.2;
    if (reduction > limit) {
      this.impot -= limit;
    } else {
      this.impot -= reduction;
    }
    if (this.impot < 0) {
      this.impot = 0;
    }
  }

  public onMaritalChange(isMarried: boolean): void {
    if (isMarried) {
      this.nbPartBase += 1;
      this.nbPart += 1;
      return;
    }
    if (this.nbPart > 1) {
      this.nbPartBase -= 1;
      this.nbPart -= 1;
    }
  }

  // Weird behavior here
  public udChange(donUd: number): void {
    if (donUd > 1000) {
      this.donUF += donUd - 1000;
      this.donUD = 1000;
      return;
    }
    this.donUD = donUd;
  }

  public ufChange(donUF: number): void {
    if (this.donUF > 0) {
      this.donUF += donUF;
      return;
    }
    this.donUF = donUF;
  }

  public onPart(event: number) {
    this.nbPart = event;
    this.quotientFamilial = this.revNet / this.nbPart;
  }

  public onRevNet(event: number) {
    this.revNet = event;
    this.quotientFamilial = this.revNet / this.nbPart;
  }

  private calculByTranche(
    tranche: { min: number; max: number; percent: number },
    quotient: number,
  ): void {
    if (quotient > tranche.max) {
      this.impot =
        this.impot + (tranche.max - (tranche.min - 1)) * tranche.percent;
      this.calculByTranche(
        this.trancheIterator.next().value[1],
        this.quotientFamilial,
      );
    }
    if (quotient < tranche.max) {
      this.impot =
        this.impot +
        (this.quotientFamilial - (tranche.min - 1)) * tranche.percent;
      this.trancheIterator = this.tranche.entries();
    }
  }

  private setTranche(): void {
    this.tranche.set("t1", {
      min: 0,
      max: 11294,
      percent: 0,
    });
    this.tranche.set("t2", {
      min: 11295,
      max: 28797,
      percent: 0.11,
    });
    this.tranche.set("t3", {
      min: 28798,
      max: 82341,
      percent: 0.3,
    });
    this.tranche.set("t4", {
      min: 82342,
      max: 177106,
      percent: 0.41,
    });
    this.tranche.set("t5", {
      min: 177107,
      max: Infinity,
      percent: 0.45,
    });
  }
}
