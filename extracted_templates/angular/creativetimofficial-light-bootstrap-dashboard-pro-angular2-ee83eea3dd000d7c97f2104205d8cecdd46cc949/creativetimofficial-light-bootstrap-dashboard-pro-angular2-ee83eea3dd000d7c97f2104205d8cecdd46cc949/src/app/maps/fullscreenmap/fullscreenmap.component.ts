import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fullscreen-map-cmp',
    templateUrl: 'fullscreenmap.component.html'
})

export class FullScreenMapsComponent implements OnInit {
    zoom = 13;
    center: google.maps.LatLngLiteral = { lat: 40.748817, lng: -73.985428 };
    options: google.maps.MapOptions = {
        scrollwheel: false,
    };
    ngOnInit() {
    }
}
