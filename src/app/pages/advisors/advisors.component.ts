import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";

import {
  DEFAULT_DOT_SIZE,
  TriangleComponent
} from "../../components/triangle/triangle.component";

@Component({
  selector: "rc-advisors",
  templateUrl: "./advisors.component.html",
  styleUrls: ["./advisors.component.scss"],
})
export class AdvisorsComponent {
  public DEFAULT_DOT_SIZE = DEFAULT_DOT_SIZE;

  @ViewChild(TriangleComponent, { static: true })
  public readonly triangle: TriangleComponent;

  public projectAsAngular = true;
  public contentCollapsed = true;

  // tslint:disable-next-line:typedef
  public get toggleTriangleLabel() {
    return this.triangle.isActive ? "Stop" : "Restart";
  }

  // tslint:disable-next-line:typedef
  public toggleTriangle() {
    this.triangle.toggle();
  }

  // tslint:disable-next-line:typedef
  public toggle() {
    this.projectAsAngular = !this.projectAsAngular;
  }

  // tslint:disable-next-line:typedef
  public dotSizeChanged(ev: MatSliderChange) {
    this.triangle.start({ dotSize: ev.value, redraw: true });
  }
}
