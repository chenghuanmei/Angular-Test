import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "../hero";

import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.scss"]
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  // hero: Hero;
  public ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
  }

  public goBack(): void {
    this.location.back();
  }

  public save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
