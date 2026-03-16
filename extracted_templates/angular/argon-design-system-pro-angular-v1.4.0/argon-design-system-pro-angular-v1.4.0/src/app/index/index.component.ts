import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import noUiSlider from "nouislider";
import Choices from 'choices.js';
import { Router } from "@angular/router";
import flatpickr from 'flatpickr';

@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  focus8;
  focus9;
  focus10;
  focus11;
  focus12;
  focus13;
  focus14;
  focus15;
  focus16;
  focus17;
  focus18;
  focus19;
  focus20;
  focus21;
  focus22;
  focus23;
  page = 2;
  page0 = 2;
  page6 = 2;
  page5 = 3;
  page1 =1;
  page2 = 2;
  page3 = 2;
  page4 = 1;
  isDropup = true;
  items = ['Pizza', 'Pasta', 'Parmesan'];
  isCollapsed = true;
  autoclose = false;
  constructor(private router: Router) {
    router.events.subscribe(val => {
      this.autoclose = true;
      this.isCollapsed = true;
    });
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    var buttonScrollTop = document.getElementsByClassName('back-to-top')[0];
    if (window.pageYOffset > 100 && buttonScrollTop) {
        buttonScrollTop.classList.add('show');
    }
    else{
      buttonScrollTop.classList.remove('show');
    }
  }
  scrollTop(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    // Datepicker
    flatpickr('.flatpickr', {});

    // Datepicker - range
    flatpickr('.range', {
      mode: "range"
    });

    // DateTimePicker
    flatpickr('.datetimepicker', {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    var navbar = document.getElementById("navbar-main");
    navbar.classList.add("navbar-transparent");


    var choicesSingle = document.getElementById('choices-single-default');
    if (choicesSingle) {
      new Choices('#choices-single-default', {
        searchEnabled: false,
      });
    }

    var choicesMultiple = document.getElementById('choices-multiple-default');
    if (choicesMultiple) {
      new Choices('#choices-multiple-default', {
          searchEnabled: true,
          delimiter: ',',
          editItems: true,
          removeItemButton: true,
        });
    }

    var badges = document.getElementById('badges');
    if (badges) {
      // Activate Tags
      new Choices('#badges', {
        delimiter: ',',
        maxItemCount: 5,
        editItems: true,
        removeItems: true,
        removeItemButton: true,
      });
    }

    var slider = document.getElementById("sliderRegular");

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById("sliderDouble");

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");

    var navbar = document.getElementById("navbar-main");
    navbar.classList.remove("navbar-transparent");
  }
}
