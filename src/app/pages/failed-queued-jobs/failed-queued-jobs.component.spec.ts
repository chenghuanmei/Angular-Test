import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FailedQueuedJobsComponent } from "./failed-queued-jobs.component";

describe("FailedQueuedJobsComponent", () => {
  let component: FailedQueuedJobsComponent;
  let fixture: ComponentFixture<FailedQueuedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FailedQueuedJobsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedQueuedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
