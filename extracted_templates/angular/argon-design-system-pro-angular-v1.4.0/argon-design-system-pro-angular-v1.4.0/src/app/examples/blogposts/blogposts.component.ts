import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-blogposts",
  templateUrl: "blogposts.component.html"
})
export class BlogpostsComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("blog-posts");
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("blog-posts");
  }
}
