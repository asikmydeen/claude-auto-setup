import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-ecommerce",
  templateUrl: "ecommerce.component.html"
})
export class EcommerceComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("ecommerce-page");
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("ecommerce-page");
  }
}
