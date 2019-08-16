import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdvisorsComponent } from "./pages/advisors/advisors.component";
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

const routes: Routes = [
  {
    path: "",
    redirectTo: "advisors",
    pathMatch: "full",
  },
  {
    path: "advisors",
    component: AdvisorsComponent,
  },
  {
    path: "clients",
    component: ClientsComponent,
  },
  {
    path: "leads",
    component: LeadsComponent,
  },
  {
    path: "model_portfolios",
    component: PortfoliosComponent,
  },
  {
    path: "securities",
    component: SecuritiesComponent,
  },
  {
    path: "organizations",
    component: OrganizationsComponent,
  },
  {
    path: "integrations",
    component: IntegrationsComponent,
  },
  {
    path: "schwab_upload",
    component: SchwabUploadComponent,
  },
  {
    path: "password_resets",
    component: PasswordResetsComponent,
  },
  {
    path: "sso",
    component: SsoBindingComponent,
  },
  {
    path: "failed_queued_jobs",
    component: FailedQueuedJobsComponent,
  },
  {
    path: "integration_sync_events",
    component: IntegrationSyncEventsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
