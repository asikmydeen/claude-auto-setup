import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-accountsettings",
  templateUrl: "accountsettings.component.html"
})
export class AccountsettingsComponent implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("account-settings");
  }
  ngAfterViewChecked(){
     this.cdr.detectChanges();
   }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("account-settings");
  }
}
