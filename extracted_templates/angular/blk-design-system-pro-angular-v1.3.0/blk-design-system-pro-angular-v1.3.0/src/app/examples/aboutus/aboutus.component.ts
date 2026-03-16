import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-aboutus",
  templateUrl: "aboutus.component.html"
})
export class AboutusComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("about-us");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("about-us");
  }
}
