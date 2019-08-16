import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { registerElement } from "@angular-react/core";
import { ReactDot, ReactDotComponent } from "./react-dot/react-dot.component";
import {
  ReactShoppingList,
  ReactShop
} from "./shopping-list/shoppingList.component";

const components = [ReactDotComponent, ReactShoppingList];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReactComponentsModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement("ReactDot", () => ReactDot);
    registerElement("ReactShop", () => ReactShop);
  }
}

export { ReactDotComponent, ReactShoppingList };
