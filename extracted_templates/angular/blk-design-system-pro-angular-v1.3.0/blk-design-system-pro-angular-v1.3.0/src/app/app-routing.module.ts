import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./index/index.component";
import { PresentationComponent } from "./presentation/presentation.component";
import { SectionsComponent } from "./sections/sections.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { AboutusComponent } from "./examples/aboutus/aboutus.component";
import { Error500Component } from "./examples/500error/500error.component";
import { AccountsettingsComponent } from "./examples/accountsettings/accountsettings.component";
import { BlogpostComponent } from "./examples/blogpost/blogpost.component";
import { BlogpostsComponent } from "./examples/blogposts/blogposts.component";
import { ChatpageComponent } from "./examples/chatpage/chatpage.component";
import { CheckoutpageComponent } from "./examples/checkoutpage/checkoutpage.component";
import { ContactusComponent } from "./examples/contactus/contactus.component";
import { EcommerceComponent } from "./examples/ecommerce/ecommerce.component";
import { ErrorComponent } from "./examples/error/error.component";
import { InvoicepageComponent } from "./examples/invoicepage/invoicepage.component";
import { LoginpageComponent } from "./examples/loginpage/loginpage.component";
import { PricingComponent } from "./examples/pricing/pricing.component";
import { ProductpageComponent } from "./examples/productpage/productpage.component";
import { ResetpageComponent } from "./examples/resetpage/resetpage.component";

const routes: Routes = [
  { path: "", redirectTo: "presentation", pathMatch: "full" },
  { path: "components", component: IndexComponent },
  { path: "presentation", component: PresentationComponent },
  { path: "sections", component: SectionsComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "about-us", component: AboutusComponent },
  { path: "error500", component: Error500Component },
  { path: "account-settings", component: AccountsettingsComponent },
  { path: "blogpost", component: BlogpostComponent },
  { path: "blogposts", component: BlogpostsComponent },
  { path: "chat", component: ChatpageComponent },
  { path: "checkout", component: CheckoutpageComponent },
  { path: "contact-us", component: ContactusComponent },
  { path: "ecommerce", component: EcommerceComponent },
  { path: "error", component: ErrorComponent },
  { path: "invoice", component: InvoicepageComponent },
  { path: "login", component: LoginpageComponent },
  { path: "pricing", component: PricingComponent },
  { path: "product", component: ProductpageComponent },
  { path: "reset", component: ResetpageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
