import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SchwabUploadComponent } from "./schwab-upload.component";

describe("SchwabUploadComponent", () => {
  let component: SchwabUploadComponent;
  let fixture: ComponentFixture<SchwabUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchwabUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchwabUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
