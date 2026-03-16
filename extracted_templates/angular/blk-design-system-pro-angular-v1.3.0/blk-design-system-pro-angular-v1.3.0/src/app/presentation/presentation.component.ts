import { Component, OnInit } from "@angular/core";

import Glide from "@glidejs/glide";

@Component({
  selector: "app-presentation",
  templateUrl: "presentation.component.html"
})
export class PresentationComponent implements OnInit {
  constructor() {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    new Glide(".glide", {
      type: "carousel",
      perView: 5,
      startAt: 2,
      focusAt: 2,
      animationDuration: 500
    }).mount();

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("presentation-page");
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("presentation-page");
  }
}
