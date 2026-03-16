import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-pricingpage",
  templateUrl: "pricingpage.component.html"
})
export class PricingpageComponent implements OnInit, OnDestroy {
  focus;
  isCollapsed = true;
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("pricing-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.add("bg-white");
    navbar.classList.remove("navbar-dark");

    var logoImage: any = document.getElementById('brand-logo');
    logoImage.src = 'assets/img/brand/red.png';
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("pricing-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.remove("bg-white");
    navbar.classList.add("navbar-dark");

    var logoImage: any = document.getElementById('brand-logo');
    logoImage.src = 'assets/img/brand/argon-white.png';

  }
}
