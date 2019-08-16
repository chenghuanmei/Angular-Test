import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdvisorsComponent } from "./pages/advisors/advisors.component";

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSelectModule,
  MatToolbarModule
} from "@angular/material";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { DatatableComponent } from "./components/datatable/datatable.component";
import { ClientsComponent } from "./pages/clients/clients.component";
import { FailedQueuedJobsComponent } from "./pages/failed-queued-jobs/failed-queued-jobs.component";
import { IntegrationSyncEventsComponent } from "./pages/integration-sync-events/integration-sync-events.component";
import { IntegrationsComponent } from "./pages/integrations/integrations.component";
import { LeadsComponent } from "./pages/leads/leads.component";
import { OrganizationsComponent } from "./pages/organizations/organizations.component";
import { PasswordResetsComponent } from "./pages/password-resets/password-resets.component";
import { PortfoliosComponent } from "./pages/portfolios/portfolios.component";
import { SchwabUploadComponent } from "./pages/schwab-upload/schwab-upload.component";
import { SecuritiesComponent } from "./pages/securities/securities.component";
import { SsoBindingComponent } from "./pages/sso-binding/sso-binding.component";
import { ReactComponentsModule } from "./react-components/react-components.module";

@NgModule({
  declarations: [
    AppComponent,

    // page componets
    AdvisorsComponent,
    ClientsComponent,
    LeadsComponent,
    PortfoliosComponent,
    SecuritiesComponent,
    OrganizationsComponent,
    IntegrationsComponent,
    PasswordResetsComponent,
    SsoBindingComponent,
    IntegrationSyncEventsComponent,
    FailedQueuedJobsComponent,
    SchwabUploadComponent,
    // DatatableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ReactComponentsModule,

    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatToolbarModule,

    // NgxDatatableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
