import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import noUiSlider from "nouislider";

@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy {
  isDropup = true;
  isCollapsed1 = true;
  isCollapsed = true;

  isCollapsed2 = true;
  isCollapsed3 = true;

  focus;
  focus1;
  focus2;
  focus3;
  mytime;
  page3 = 2;

  date: Date = new Date();

  switch = true;

  page = 2;
  page1 = 3;
  page2 = 4;

  data1 = [{ id: "2", itemName: "Foobar" }, { id: "3", itemName: "Is great" }];
  settings1 = {
    singleSelection: true,
    text: "Single Select",
    enableSearchFilter: false,
    classes: "selectpicker btn-primary",
    autoPosition: false
  };
  selectedItems1 = [];
  data2 = [
    { id: "2", itemName: "Paris ", category: "All" },
    { id: "3", itemName: "Bucharest", category: "All" },
    { id: "4", itemName: "Rome", category: "All" },
    { id: "5", itemName: "New York", category: "All" },
    { id: "6", itemName: "Miami ", category: "All" },
    { id: "7", itemName: "Piatra Neamt", category: "All" },
    { id: "8", itemName: "Paris ", category: "All" },
    { id: "9", itemName: "Bucharest", category: "All" },
    { id: "10", itemName: "Rome", category: "All" },
    { id: "11", itemName: "New York", category: "All" },
    { id: "12", itemName: "Miami ", category: "All" },
    { id: "13", itemName: "Piatra Neamt", category: "All" },
    { id: "14", itemName: "Paris ", category: "All" },
    { id: "15", itemName: "Bucharest", category: "All" },
    { id: "16", itemName: "Rome", category: "All" },
    { id: "17", itemName: "New York", category: "All" },
    { id: "18", itemName: "Miami ", category: "All" },
    { id: "19", itemName: "Piatra Neamt", category: "All" }
  ];
  selectedItems2 = [];
  settings2 = {
    singleSelection: false,
    text: "Choose City",
    enableSearchFilter: false,
    classes: "selectpicker btn-info",
    groupBy: "category"
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
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
    this.cdr.detectChanges();

  }

  ngAfterViewChecked(){
   //your code to update the model
     this.cdr.detectChanges();
   }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
