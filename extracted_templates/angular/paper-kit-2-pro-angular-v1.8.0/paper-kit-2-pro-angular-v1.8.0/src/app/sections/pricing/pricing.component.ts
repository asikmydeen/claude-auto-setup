import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  activeTab = 1;
  activeTab1 = 1;
  constructor() { }

  ngOnInit() {
  }

}
