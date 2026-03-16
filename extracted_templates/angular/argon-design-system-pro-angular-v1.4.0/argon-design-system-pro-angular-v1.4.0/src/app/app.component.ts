import { Component, OnInit } from "@angular/core";
import Headroom from "headroom.js";
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(public router: Router){}

  ngOnInit(){
    var headroom = new Headroom(document.querySelector("#navbar-main"), {
      offset: 300,
      tolerance: {
        up: 30,
        down: 30
      },
    });
    headroom.init();
  }
}
