import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-productpage",
  templateUrl: "productpage.component.html"
})
export class ProductpageComponent implements OnInit, OnDestroy {
  value = 1;
  constructor(private cdr: ChangeDetectorRef) {}
  up() {
    this.value++;
  }
  down() {
    if (this.value > 1) {
      this.value--;
    }
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("product-page");
  }
  ngAfterViewChecked(){
     this.cdr.detectChanges();
   }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("product-page");
  }
}
