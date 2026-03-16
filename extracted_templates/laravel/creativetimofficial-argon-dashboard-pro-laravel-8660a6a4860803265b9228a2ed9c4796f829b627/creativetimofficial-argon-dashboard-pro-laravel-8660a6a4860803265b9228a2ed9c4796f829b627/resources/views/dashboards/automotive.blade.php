@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Automotive'])
            <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
                <a href="javascript:;" class="nav-link p-0">
                    <div class="sidenav-toggler-inner">
                        <i class="sidenav-toggler-line bg-white"></i>
                        <i class="sidenav-toggler-line bg-white"></i>
                        <i class="sidenav-toggler-line bg-white"></i>
                    </div>
                </a>
            </div>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div class="input-group">
                        <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here...">
                    </div>
                </div>
                <ul class="navbar-nav  justify-content-end">
                    <li class="nav-item d-flex align-items-center">
                        @include('auth.logout')
                    </li>
                    <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
                            <div class="sidenav-toggler-inner">
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item px-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0">
                            <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                        </a>
                    </li>
                    <li class="nav-item position-relative pe-2 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-bell cursor-pointer"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="my-auto">
                                            <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm  me-3 "
                                                alt="user image">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                <span class="font-weight-bold">New message</span> from Laur
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                13 minutes ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="my-auto">
                                            <img src="../../assets/img/small-logos/logo-spotify.svg"
                                                class="avatar avatar-sm bg-gradient-dark  me-3 " alt="logo spotify">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                <span class="font-weight-bold">New album</span> by Travis Scott
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                1 day
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                            <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>credit-card</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(453.000000, 454.000000)">
                                                                <path class="color-background"
                                                                    d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                                                    opacity="0.593633743"></path>
                                                                <path class="color-background"
                                                                    d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                Payment successfully completed
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                2 days
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card shadow-lg">
                    <img src="../../assets/img/shapes/pattern-left.png" alt="pattern-lines"
                        class="position-absolute overflow-hidden opacity-4 start-0 top-0 h-100 border-radius-xl">
                    <img src="../../assets/img/shapes/pattern-right.png" alt="pattern-lines"
                        class="position-absolute overflow-hidden opacity-4 end-0 top-0 h-100 border-radius-xl">
                    <div class="card-body px-5 z-index-1 bg-cover">
                        <div class="row">
                            <div class="col-lg-3 col-12 my-auto">
                                <h4 class="text-body opacity-9 text-center">Since Last Charge</h4>
                                <hr class="horizontal light mt-1 mb-3">
                                <div class="d-flex justify-content-center">
                                    <div>
                                        <h6 class="mb-0 text-body opacity-7">Distance</h6>
                                        <h3 class="text-body">145 <small class="text-sm align-top">Km</small></h3>
                                    </div>
                                    <div class="ms-lg-6 ms-4 text-center">
                                        <h6 class="mb-0 text-body opacity-7">Average Energy</h6>
                                        <h3 class="text-body">300 <small class="text-sm align-top">Kw</small></h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12 text-center">
                                <img class="w-75 w-lg-100 mt-n7 mt-lg-n8 d-none d-md-block" src="../../assets/img/tesla.png"
                                    alt="car image">
                                <div class="d-flex align-items-center">
                                    <h4 class="text-body opacity-7 ms-0 ms-md-auto">Available Range</h4>
                                    <h2 class="text-body ms-2 me-auto">47<small class="text-sm align-top"> %</small></h2>
                                </div>
                            </div>
                            <div class="col-lg-3 col-12 my-auto">
                                <h4 class="text-body opacity-9">Nearest Charger</h4>
                                <hr class="horizontal light mt-1 mb-3">
                                <div class="d-flex align-items-center">
                                    <div>
                                        <h6 class="mb-0 text-body">Miclan, DW</h6>
                                        <h6 class="mb-0 text-body">891 Limarenda road</h6>
                                    </div>
                                    <div class="ms-lg-6 ms-4">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-dark mb-0 py-0">
                                            <i class="ni ni-map-big" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-3 col-md-6 col-12">
                <div class="card bg-primary">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-white text-sm mb-0 text-uppercase font-weight-bold opacity-7">Today's
                                        Trip</p>
                                    <h5 class="text-white font-weight-bolder mb-0">
                                        145 Km
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-white shadow text-center rounded-circle">
                                    <i class="ni ni-money-coins text-dark text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-12 mt-4 mt-md-0">
                <div class="card bg-primary">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-white text-sm mb-0 text-uppercase font-weight-bold opacity-7">Battery
                                        Health</p>
                                    <h5 class="text-white font-weight-bolder mb-0">
                                        99 %
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-white shadow text-center rounded-circle">
                                    <i class="ni ni-controller text-dark text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-12 mt-4 mt-lg-0">
                <div class="card bg-primary">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-white text-sm mb-0 text-uppercase font-weight-bold opacity-7">Average
                                        Speed</p>
                                    <h5 class="text-white font-weight-bolder mb-0">
                                        56 Km/h
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-white shadow text-center rounded-circle">
                                    <i class="ni ni-delivery-fast text-dark text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-12 mt-4 mt-lg-0">
                <div class="card bg-primary">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-white text-sm mb-0 text-uppercase font-weight-bold opacity-7">Music
                                        Volume</p>
                                    <h5 class="text-white font-weight-bolder mb-0">
                                        15/100
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-white shadow text-center rounded-circle">
                                    <i class="ni ni-note-03 text-dark text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card shadow-lg">
                    <div class="card-header bg-transparent">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="input-group input-group-lg">
                                    <span class="input-group-text text-body bg-transparent border-0">
                                        <i class="ni ni-zoom-split-in text-lg" aria-hidden="true"></i>
                                    </span>
                                    <input type="text" class="form-control bg-transparent border-0"
                                        placeholder="Search anything..." onfocus="focused(this)"
                                        onfocusout="defocused(this)">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-12 my-auto ms-auto">
                                <div class="d-flex align-items-center">
                                    <i class="ni ni-headphones text-lg text-body ms-auto" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="Headphones connected"></i>
                                    <i class="ni ni-button-play text-lg text-body ms-3" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="Music is playing"></i>
                                    <i class="ni ni-button-power text-lg text-body ms-3" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="Start radio"></i>
                                    <i class="ni ni-watch-time text-lg text-body ms-3" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="Time tracker"></i>
                                    <h4 class="text-body mb-1 ms-4">10:45</h4>
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal light">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="d-flex align-items-center position-relative">
                                    <h3 class="text-body mb-1">11:13</h3>
                                    <p class="text-body opacity-8 mb-1 ms-3">Estimated arrival time</p>
                                    <hr class="vertical light mt-0">
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="d-flex align-items-center position-relative">
                                    <h3 class="text-body mb-1 ms-md-auto">2.4<small class="align-top text-sm">Km</small>
                                    </h3>
                                    <p class="text-body opacity-8 mb-1 ms-3 me-auto">Turn right in 2.4 miles</p>
                                    <hr class="vertical light mt-0">
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 ms-lg-auto">
                                <div class="d-flex align-items-center">
                                    <h3 class="text-body mb-1 ms-lg-auto">6.3<small class="align-top text-sm">Km</small>
                                    </h3>
                                    <p class="text-body opacity-8 mb-1 ms-3">Distance to Creative Tim</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 py-0">
                        <div id="mapid" class="leaflet"></div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="d-flex align-items-center">
                                    <div class="position-relative">
                                        <div class="avatar avatar-lg">
                                            <img src="../../assets/img/bruce-mars.jpg" alt="kal"
                                                class="border-radius-xl rounded-circle shadow">
                                        </div>
                                        <img class="position-absolute w-60 end-0 bottom-0 me-n3 mb-0"
                                            src="../../assets/img/small-logos/logo-spotify.svg" alt="spotify logo">
                                    </div>
                                    <div class="px-3">
                                        <p class="text-body text-sm font-weight-bold mb-0">
                                            You're Mines Still (feat Drake)
                                        </p>
                                        <p class="text-body text-xs mb-2 opacity-8">
                                            Yung Bleu - Hip-Hop
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 my-auto text-center mt-3 mt-lg-0">
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-lg btn-icon-only btn-rounded btn-outline-dark mb-0 ms-auto">
                                        <i class="ni ni-button-play top-0 rotate-180" aria-hidden="true"></i>
                                    </button>
                                    <button class="btn btn-lg btn-icon-only btn-rounded btn-outline-dark mb-0 ms-4">
                                        <i class="ni ni-button-pause top-0" aria-hidden="true"></i>
                                    </button>
                                    <button
                                        class="btn btn-lg btn-icon-only btn-rounded btn-outline-dark mb-0 ms-4 me-auto">
                                        <i class="ni ni-button-play top-0" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-8 my-auto">
                                <p class="text-body mb-2">Volume</p>
                                <div id="sliderRegular"></div>
                            </div>
                            <div class="col-lg-1 col-md-6 col-4 my-auto ms-auto">
                                <i class="ni ni-bullet-list-67 text-body mt-3 ms-auto" data-bs-toggle="tooltip"
                                    data-bs-placement="top" title="Hide menu"></i>
                                <i class="ni ni-chat-round text-body ms-3 mt-3" data-bs-toggle="tooltip"
                                    data-bs-placement="top" title="Track messages"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @include('layouts.footers.auth.footer')
    </div>
@endsection

@push('js')
    <script src="/assets/js/plugins/leaflet.js"></script>
    <script src="/assets/js/plugins/nouislider.min.js"></script>
    <script>
        // Initialize the map and assign it to a variable for later use
        // there's a few ways to declare a VARIABLE in javascript.
        // you might also see people declaring variables using `const` and `let`
        var map = L.map('mapid', {
            // Set latitude and longitude of the map center (required)
            center: [38.89, -77.03],
            // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
            zoom: 11
        });


        // Create a Tile Layer and add it to the map
        var tiles = new L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: '19'
        }).addTo(map);


        // Init slider
        var slider = document.getElementById("sliderRegular");
        noUiSlider.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });
    </script>
@endpush
