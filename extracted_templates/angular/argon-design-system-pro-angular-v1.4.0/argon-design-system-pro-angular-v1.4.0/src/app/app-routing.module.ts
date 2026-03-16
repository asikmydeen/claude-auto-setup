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
import { PricingpageComponent } from "./examples/pricingpage/pricingpage.component";
import { ProductpageComponent } from "./examples/productpage/productpage.component";
import { ResetpageComponent } from "./examples/resetpage/resetpage.component";

const routes: Routes = [
  { path: "", redirectTo: "presentation", pathMatch: "full" },
  { path: "index", component: IndexComponent },
  { path: "presentation", component: PresentationComponent },
  { path: "sections", component: SectionsComponent },
  { path: "examples/profile-page", component: ProfilepageComponent },
  { path: "examples/register-page", component: RegisterpageComponent },
  { path: "examples/landing-page", component: LandingpageComponent },
  { path: "examples/about-us", component: AboutusComponent },
  { path: "examples/500-error", component: Error500Component },
  { path: "examples/account-settings", component: AccountsettingsComponent },
  { path: "examples/blog-post", component: BlogpostComponent },
  { path: "examples/blog-posts", component: BlogpostsComponent },
  { path: "examples/chat-page", component: ChatpageComponent },
  { path: "examples/checkout-page", component: CheckoutpageComponent },
  { path: "examples/contact-us", component: ContactusComponent },
  { path: "examples/ecommerce", component: EcommerceComponent },
  { path: "examples/error", component: ErrorComponent },
  { path: "examples/invoice-page", component: InvoicepageComponent },
  { path: "examples/login-page", component: LoginpageComponent },
  { path: "examples/pricing-page", component: PricingpageComponent },
  { path: "examples/product-page", component: ProductpageComponent },
  { path: "examples/reset-page", component: ResetpageComponent }
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
