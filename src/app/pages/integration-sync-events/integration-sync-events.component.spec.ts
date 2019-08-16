import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IntegrationSyncEventsComponent } from "./integration-sync-events.component";

describe("IntegrationSyncEventsComponent", () => {
  let component: IntegrationSyncEventsComponent;
  let fixture: ComponentFixture<IntegrationSyncEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntegrationSyncEventsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationSyncEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
