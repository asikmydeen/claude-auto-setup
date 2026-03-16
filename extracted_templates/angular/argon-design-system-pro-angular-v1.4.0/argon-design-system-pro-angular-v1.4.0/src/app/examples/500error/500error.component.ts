import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-500error",
  templateUrl: "500error.component.html"
})
export class Error500Component implements OnInit, OnDestroy {
  constructor(){}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("error-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.add("bg-primary");
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("error-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.remove("bg-primary");
  }
}
