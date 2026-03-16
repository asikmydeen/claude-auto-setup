import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-checkoutpage",
  templateUrl: "checkoutpage.component.html"
})
export class CheckoutpageComponent implements OnInit, OnDestroy {
  data1 = [
    { id: "", itemName: "Select country" },
    { id: "CZ", itemName: "Czech Republic" },
    { id: "DK", itemName: "Denmark" },
    { id: "DO", itemName: "Dominican Republic" },
    { id: "IQ", itemName: "Iraq" },
    { id: "IL", itemName: "Israel" },
    { id: "IT", itemName: "Italy" },
    { id: "JM", itemName: "Jamaica" },
    { id: "JP", itemName: "Japan" },
    { id: "MG", itemName: "Madagascar" },
    { id: "MT", itemName: "Malta" },
    { id: "NO", itemName: "Norway" },
    { id: "PL", itemName: "Poland" },
    { id: "PT", itemName: "Portugal" },
    { id: "RO", itemName: "Romania" },
    { id: "RU", itemName: "Russian Federation" },
    { id: "LC", itemName: "Saint Lucia" },
    { id: "WS", itemName: "Samoa" },
    { id: "SM", itemName: "San Marino" },
    { id: "SA", itemName: "Saudi Arabia" },
    { id: "ES", itemName: "Spain" },
    { id: "SZ", itemName: "Swaziland" },
    { id: "SE", itemName: "Sweden" },
    { id: "TR", itemName: "Turkey" },
    { id: "UG", itemName: "Uganda" },
    { id: "UA", itemName: "Ukraine" },
    { id: "AE", itemName: "United Arab Emirates" },
    { id: "GB", itemName: "United Kingdom" },
    { id: "US", itemName: "United States" },
    { id: "VN", itemName: "Viet Nam" }
  ];
  settings1 = {
    singleSelection: true,
    text: "Single Select",
    enableSearchFilter: false,
    classes: "selectpicker btn-primary",
    lazyLoading: true,
    maxHeight: 200
  };
  selectedItems1 = [];
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("checkout-page");
  }
  ngAfterViewChecked(){
     this.cdr.detectChanges();
   }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("checkout-page");
  }
}
