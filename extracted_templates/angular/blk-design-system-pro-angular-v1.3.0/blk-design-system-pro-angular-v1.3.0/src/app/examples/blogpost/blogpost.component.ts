import { Component, OnInit, OnDestroy } from "@angular/core";
import * as Rellax from "rellax";
import Glide from "@glidejs/glide";

@Component({
  selector: "app-blogpost",
  templateUrl: "blogpost.component.html"
})
export class BlogpostComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    var rellaxHeader = new Rellax(".rellax", {
      speed: -6
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("blog-post");

    new Glide(".glide", {
      type: "carousel",
      perView: 3
    }).mount();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("blog-post");
  }
}
