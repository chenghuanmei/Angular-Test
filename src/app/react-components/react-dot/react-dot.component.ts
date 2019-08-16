// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
import { ReactWrapperComponent } from "@angular-react/core";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Renderer2,
  ViewChild
} from "@angular/core";
import * as React from "react";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "app-react-dot",
  template: `
    <ReactDot
      #reactNode
      [text]="text"
      (onMouseEnter)="onMouseEnter($event)"
      (onMouseLeave)="onMouseLeave($event)"
      [styles]="{
        width: size,
        lineHeight: size,
        height: size,
        left: x,
        top: y,
        color: color,
        backgroundColor: backgroundColor,
        fontSize: size
      }"
    >
      <react-content> <ng-content></ng-content> </react-content>
    </ReactDot>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ["react-renderer"],
})
export class ReactDotComponent extends ReactWrapperComponent<ReactDotProps> {
  // tslint:disable-next-line:typedef
  public get computedText() {
    return this.textOverride && this.text ? this.textOverride : this.text;
  }

  @Input() public x: string;
  @Input() public y: string;
  @Input() public size: string;
  @Input() public text: string;
  @Input() public color: string;
  @Input() public backgroundColor: string;
  @Input() public textOverride: string;

  @Output("onMouseEnter") public readonly mouseEnter = new EventEmitter<
    MouseEvent
  >();
  @Output("onMouseLeave") public readonly mouseLeave = new EventEmitter<
    MouseEvent
  >();
  @ViewChild("reactNode", { static: true }) protected reactNodeRef: ElementRef;

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    renderer: Renderer2,
    ngZone: NgZone
  ) {
    super(elementRef, changeDetectorRef, renderer, {
      ngZone,
      setHostDisplay: true,
    });
  }

  // tslint:disable-next-line:typedef
  public onMouseEnter = (ev: MouseEvent) => this.mouseEnter.emit(ev);
  // tslint:disable-next-line:typedef
  public onMouseLeave = (ev: MouseEvent) => this.mouseLeave.emit(ev);
}

interface ReactDotProps {
  text: string;
  styles?: object;
  onMouseEnter?(ev: MouseEvent): void;
  onMouseLeave?(ev: MouseEvent): void;
}

export class ReactDot extends React.Component<ReactDotProps> {
  private static defaultStyle = {
    display: "block",
    position: "absolute",
    textAlign: "center",
    borderRadius: "30%",
    cursor: "pointer",
  };

  public render(): any {
    const { text, styles, ...rest } = this.props;

    return React.createElement(
      "div",
      {
        ...rest,
        style: {
          ...ReactDot.defaultStyle,
          ...styles,
        },
      },
      [this.props["text"], ...(this.props.children as any)]
    );
  }
}
