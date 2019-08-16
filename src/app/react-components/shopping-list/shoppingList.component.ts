// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
import { ReactWrapperComponent } from "@angular-react/core";
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  Renderer2,
  NgZone
} from "@angular/core";
import * as React from "react";

@Component({
  selector: "app-react-shopping-list",
  template: `
    <ReactShop
      #reactShop
      [name]="name"
      (onMouseEnter)="onMouseEnter($event)"
      (onMouseLeave)="onMouseLeave($event)"
    >
      <react-content>
        <ng-content></ng-content>
      </react-content>
    </ReactShop>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ["react-renderer"]
})
// tslint:disable-next-line:component-class-suffix
export class ReactShoppingList extends ReactWrapperComponent<IShoppingPayload> {
  @ViewChild("reactShop", { static: true })
  protected reactNodeRef: import("@angular/core").ElementRef<HTMLElement>;
  @Input() name: string;

  @Output("onMouseEnter") readonly mouseEnter = new EventEmitter<MouseEvent>();
  @Output("onMouseLeave") readonly mouseLeave = new EventEmitter<MouseEvent>();

  onMouseEnter = (ev: MouseEvent) => this.mouseEnter.emit(ev);
  onMouseLeave = (ev: MouseEvent) => this.mouseLeave.emit(ev);

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    renderer: Renderer2,
    ngZone: NgZone
  ) {
    super(elementRef, changeDetectorRef, renderer, {
      ngZone,
      setHostDisplay: true
    });
  }
}

interface IShoppingPayload {
  name: string;
  onMouseEnter?: (ev: MouseEvent) => void;
  onMouseLeave?: (ev: MouseEvent) => void;
}
export class ReactShop extends React.Component<IShoppingPayload> {
  private static defaultStyle = {
    display: "block",
    textAlign: "center",
    fontSize: "18px",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer"
  };
  render() {
    const { name, ...rest } = this.props;
    return React.createElement(
      "div",
      {
        ...rest,
        style: { ...ReactShop.defaultStyle }
      },
      [this.props["name"], ...(this.props.children as any)]
    );
  }
}
