import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-error",
  templateUrl: "error.component.html"
})
export class ErrorComponent implements OnInit, OnDestroy {
constructor(){}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("error-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.add("bg-default");
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("error-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.remove("bg-default");
  }
}
