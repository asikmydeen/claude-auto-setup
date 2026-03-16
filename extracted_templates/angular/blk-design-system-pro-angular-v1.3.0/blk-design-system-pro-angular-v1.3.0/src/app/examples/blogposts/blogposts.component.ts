import { Component, OnInit, OnDestroy } from "@angular/core";
import * as Rellax from "rellax";

@Component({
  selector: "app-blogposts",
  templateUrl: "blogposts.component.html"
})
export class BlogpostsComponent implements OnInit, OnDestroy {
  focus;
  constructor() {}

  ngOnInit() {
    var rellaxHeader = new Rellax(".rellax", {
      speed: -6
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("blog-posts");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("blog-posts");
  }
}
