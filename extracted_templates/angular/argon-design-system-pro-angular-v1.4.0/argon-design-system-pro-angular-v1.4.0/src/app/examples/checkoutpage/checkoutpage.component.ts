import { Component, OnInit, OnDestroy } from "@angular/core";
import Choices from 'choices.js';

@Component({
  selector: "app-checkoutpage",
  templateUrl: "checkoutpage.component.html"
})
export class CheckoutpageComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("checkout-page");
    var choicesSingle = document.getElementById('choices-single-default');
    if (choicesSingle) {
      new Choices('#choices-single-default', {
        searchEnabled: false,
      });
    }
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("checkout-page");
  }
}
