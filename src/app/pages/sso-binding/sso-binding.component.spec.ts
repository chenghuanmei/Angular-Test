import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SsoBindingComponent } from "./sso-binding.component";

describe("SsoBindingComponent", () => {
  let component: SsoBindingComponent;
  let fixture: ComponentFixture<SsoBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SsoBindingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
