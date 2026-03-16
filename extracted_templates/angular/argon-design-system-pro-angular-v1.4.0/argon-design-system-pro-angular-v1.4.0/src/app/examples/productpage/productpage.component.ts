import { Component, OnInit, OnDestroy } from "@angular/core";
import Glide from "@glidejs/glide";
import Choices from 'choices.js';

@Component({
  selector: "app-productpage",
  templateUrl: "productpage.component.html"
})
export class ProductpageComponent implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("product-page");

    new Glide('.testimonial-glide', {
      type: 'carousel',
      startAt: 0,
      focusAt: 2,
      perTouch: 1,
      perView: 4,
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }).mount();

    new Choices('#choices-single-default', {
      searchEnabled: false,
    });
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("product-page");
  }
}
