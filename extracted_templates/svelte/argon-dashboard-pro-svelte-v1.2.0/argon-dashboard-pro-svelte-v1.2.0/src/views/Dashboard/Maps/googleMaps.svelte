<script>
  import { fade } from "svelte/transition";
  import { API_KEY } from "./API_KEY";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import { onMount } from "svelte";
  import GoogleMapsLoader from "google-maps";
  export let name = "Google map";
  GoogleMapsLoader.KEY = API_KEY;

  onMount(async () => {
    let map,
      lat = 40.748817,
      lng = -73.985428,
      color = "#5e72e4";
    map = document.getElementById("map-custom");
    let myLatlng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      zoom: 12,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }]
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: color }, { visibility: "on" }]
        },
        {
          height: "600px"
        }
      ]
    };

    map = new google.maps.Map(map, mapOptions);

    let marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Hello World!"
    });

    let contentString =
      '<div class="info-window-content"><h2>Argon Dashboard PRO</h2>' +
      "<p>A beautiful premium dashboard for Bootstrap 4.</p></div>";

    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    google.maps.event.addListener(marker, "click", function() {
      infowindow.open(map, marker);
    });

    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.add("bg-danger");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });
</script>

<div transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">{name}</h6>
        <nav ria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <BaseButton size="sm" type="neutral">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>

  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col">
        <Card noBody={true} className="border-0">
          <div id="map-custom" class="map-canvas" />
        </Card>
      </div>
    </div>
  </div>
</div>
