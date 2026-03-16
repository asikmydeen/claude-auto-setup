import { Component, OnInit, OnDestroy } from "@angular/core";
import Glide from "@glidejs/glide";

@Component({
  selector: "app-blogpost",
  templateUrl: "blogpost.component.html"
})
export class BlogpostComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("blog-post");

    new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      focusAt: 2,
      perTouch: 1,
      perView: 4
    }).mount();
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("blog-post");
  }
}
