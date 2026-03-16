import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'vector-maps-cmp',
    templateUrl: './googlemaps.component.html'
})

export class GoogleMapsComponent implements OnInit {
    // First Map Properties
    zoom1 = 3;
    center1: google.maps.LatLngLiteral = { lat: 40.748817, lng: -73.985428 };
    options1: google.maps.MapOptions = {
        mapTypeId: 'satellite',
        scrollwheel: false,
    };

    // Second Map Properties
    zoom2 = 13;
    center2: google.maps.LatLngLiteral = { lat: 40.748817, lng: -73.985428 };
    options2: google.maps.MapOptions = {
        scrollwheel: false,
    };
    ngOnInit() {


    }
}
