@extends('layouts.app', ['class' => 'virtual-reality'])

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  mt-4  px-0 mx-4 shadow-none border-radius-xl z-index-sticky  bg-primary"
        id="navbarBlur" data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'VR Default'])
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
                                            <img src="../../../assets/img/team-2.jpg" class="avatar avatar-sm  me-3 "
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
                                            <img src="../../../assets/img/small-logos/logo-spotify.svg"
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
    </div>
    <div class="border-radius-xl mt-4 mx-4 position-relative"
        style="background-image: url('../../../assets/img/vr-bg.jpg') ; background-size: cover;">
        @include('layouts.navbars.auth.sidenav')
        <main class="main-content mt-1 border-radius-lg">
            <div class="section min-vh-85 position-relative transform-scale-0 transform-scale-md-8 transform-scale-lg-6">
                <div class="container ms-n0 ms-lg-n5">
                    <div class="row">
                        <div class="col-lg-12 mb-lg-0 mb-4 position-relative z-index-2">
                            <div class="row mb-4">
                                <div class="col-lg-6">
                                    <div class="d-flex flex-column h-100">
                                        <h2 class="font-weight-bolder mb-0 mt-4 fadeIn1 fadeInBottom">General Statistics
                                        </h2>
                                        <div class="d-flex align-items-center">
                                            <h6 class="font-weight-bolder mb-0 fadeIn4 fadeInBottom">All users</h6>
                                            <a class="text-primary text-sm font-weight-bold mb-0 icon-move-right ms-4 mt-1 fadeIn4 fadeInBottom"
                                                href="javascript:;">
                                                Read More
                                                <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <h1 class="font-weight-bolder mb-0 fadeIn4 fadeInBottom">1,600,000</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="card fadeIn1 fadeInBottom mb-4">
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Today's
                                                            Money</p>
                                                        <h5 class="font-weight-bolder">
                                                            $53,000
                                                        </h5>
                                                        <p class="mb-0">
                                                            <span
                                                                class="text-success text-sm font-weight-bolder">+55%</span>
                                                            since yesterday
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="col-4 text-end">
                                                    <div
                                                        class="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                                        <i class="ni ni-money-coins text-lg opacity-10"
                                                            aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="card fadeIn2 fadeInBottom mb-4">
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Today's
                                                            Users</p>
                                                        <h5 class="font-weight-bolder">
                                                            2,300
                                                        </h5>
                                                        <p class="mb-0">
                                                            <span class="text-success text-sm font-weight-bolder">+3%</span>
                                                            since last week
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="col-4 text-end">
                                                    <div
                                                        class="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                                        <i class="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="card fadeIn3 fadeInBottom mb-4">
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">New Clients
                                                        </p>
                                                        <h5 class="font-weight-bolder">
                                                            +3,462
                                                        </h5>
                                                        <p class="mb-0">
                                                            <span class="text-danger text-sm font-weight-bolder">-2%</span>
                                                            since last quarter
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="col-4 text-end">
                                                    <div
                                                        class="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                                        <i class="ni ni-paper-diploma text-lg opacity-10"
                                                            aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="card fadeIn4 fadeInBottom mb-4">
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Sales</p>
                                                        <h5 class="font-weight-bolder">
                                                            $103,430
                                                        </h5>
                                                        <p class="mb-0">
                                                            <span
                                                                class="text-success text-sm font-weight-bolder">+5%</span>
                                                            than last month
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="col-4 text-end">
                                                    <div
                                                        class="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                                                        <i class="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                                    <div class="card h-100 fadeIn1 fadeInBottom">
                                        <div class="card-header">
                                            <h5 class="mb-0 text-capitalize">Team members</h5>
                                        </div>
                                        <div class="card-body pt-0">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item px-0">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto d-flex align-items-center">
                                                            <a href="javascript:;" class="avatar">
                                                                <img class="border-radius-lg" alt="Image placeholder"
                                                                    src="../../../assets/img/team-1.jpg">
                                                            </a>
                                                        </div>
                                                        <div class="col ml-2">
                                                            <h6 class="mb-0">
                                                                <a href="javascript:;">John Michael</a>
                                                            </h6>
                                                            <span class="badge badge-success badge-sm">Online</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <button type="button"
                                                                class="btn btn-outline-primary btn-xs mb-0">Add</button>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item px-0">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto d-flex align-items-center">
                                                            <a href="javascript:;" class="avatar">
                                                                <img class="border-radius-lg" alt="Image placeholder"
                                                                    src="../../../assets/img/team-2.jpg">
                                                            </a>
                                                        </div>
                                                        <div class="col ml-2">
                                                            <h6 class="mb-0">
                                                                <a href="javascript:;">Alex Smith</a>
                                                            </h6>
                                                            <span class="badge badge-warning badge-sm">in Meeting</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <button type="button"
                                                                class="btn btn-xs btn-outline-primary mb-0">Add</button>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item px-0">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto d-flex align-items-center">
                                                            <a href="javascript:;" class="avatar">
                                                                <img class="border-radius-lg" alt="Image placeholder"
                                                                    src="../../../assets/img/team-5.jpg">
                                                            </a>
                                                        </div>
                                                        <div class="col ml-2">
                                                            <h6 class="mb-0">
                                                                <a href="javascript:;">Samantha Ivy</a>
                                                            </h6>
                                                            <span class="badge badge-danger badge-sm">Offline</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <button type="button"
                                                                class="btn btn-xs btn-outline-primary mb-0">Add</button>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item px-0">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto d-flex align-items-center">
                                                            <a href="javascript:;" class="avatar">
                                                                <img class="border-radius-lg" alt="Image placeholder"
                                                                    src="../../../assets/img/team-4.jpg">
                                                            </a>
                                                        </div>
                                                        <div class="col ml-2">
                                                            <h6 class="mb-0">
                                                                <a href="javascript:;">John Michael</a>
                                                            </h6>
                                                            <span class="badge badge-success badge-sm">Online</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <button type="button"
                                                                class="btn btn-xs btn-outline-primary mb-0">Add</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                    <div class="card h-100 fadeIn2 fadeInBottom">
                                        <div class="card-header">
                                            <h5 class="mb-0 text-capitalize">To do list</h5>
                                        </div>
                                        <div class="card-body pt-0">
                                            <ul class="list-group list-group-flush" data-toggle="checklist">
                                                <li class="checklist-entry list-group-item px-0">
                                                    <div
                                                        class="checklist-item checklist-item-success checklist-item-checked d-flex">
                                                        <div class="checklist-info">
                                                            <h6 class="checklist-title mb-0">Call with Dave</h6>
                                                            <small class="text-xs">09:30 AM</small>
                                                        </div>
                                                        <div class="form-check my-auto ms-auto">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="customCheck1" checked>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="checklist-entry list-group-item px-0">
                                                    <div class="checklist-item checklist-item-warning d-flex">
                                                        <div class="checklist-info">
                                                            <h6 class="checklist-title mb-0">Brunch Meeting</h6>
                                                            <small class="text-xs">11:00 AM</small>
                                                        </div>
                                                        <div class="form-check my-auto ms-auto">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="customCheck1">
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="checklist-entry list-group-item px-0">
                                                    <div class="checklist-item checklist-item-info d-flex">
                                                        <div class="checklist-info">
                                                            <h6 class="checklist-title mb-0">Argon Dashboard Launch</h6>
                                                            <small class="text-xs">02:00 PM</small>
                                                        </div>
                                                        <div class="form-check my-auto ms-auto">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="customCheck1">
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="checklist-entry list-group-item px-0">
                                                    <div
                                                        class="checklist-item checklist-item-danger checklist-item-checked d-flex">
                                                        <div class="checklist-info">
                                                            <h6 class="checklist-title mb-0">Winter Hackaton</h6>
                                                            <small>10:30 AM</small>
                                                        </div>
                                                        <div class="form-check my-auto ms-auto">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="customCheck2" checked>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="card h-100 fadeIn3 fadeInBottom">
                                        <div class="card-header">
                                            <h5 class="mb-0 text-capitalize">Progress track</h5>
                                        </div>
                                        <div class="card-body pt-0">
                                            <ul class="list-group list-group-flush list">
                                                <li class="list-group-item px-0">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto">
                                                            <a href="javascript:;" class="avatar rounded-circle">
                                                                <img alt="Image placeholder"
                                                                    src="../../../assets/img/small-logos/logo-jira.svg">
                                                            </a>
                                                        </div>
                                                        <div class="col">
                                                            <h6>React Material Dashboard</h6>
                                                            <div class="progress progress-xs mb-0">
                                                                <div class="progress-bar bg-primary" role="progressbar"
                                                                    aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
                                                                    style="width: 90%;"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item px-0">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto">
                                                            <a href="javascript:;" class="avatar rounded-circle">
                                                                <img alt="Image placeholder"
                                                                    src="../../../assets/img/small-logos/logo-asana.svg">
                                                            </a>
                                                        </div>
                                                        <div class="col">
                                                            <h6>Argon Design System</h6>
                                                            <div class="progress progress-xs mb-0">
                                                                <div class="progress-bar bg-warning" role="progressbar"
                                                                    aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                                                    style="width: 60%;"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item px-0">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto">
                                                            <a href="javascript:;" class="avatar rounded-circle">
                                                                <img alt="Image placeholder"
                                                                    src="../../../assets/img/small-logos/logo-spotify.svg">
                                                            </a>
                                                        </div>
                                                        <div class="col">
                                                            <h6>VueJs Now UI Kit PRO</h6>
                                                            <div class="progress progress-xs mb-0">
                                                                <div class="progress-bar bg-success" role="progressbar"
                                                                    aria-valuenow="100" aria-valuemin="0"
                                                                    aria-valuemax="100" style="width: 100%;"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item px-0">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto">
                                                            <a href="javascript:;" class="avatar rounded-circle">
                                                                <img alt="Image placeholder"
                                                                    src="../../../assets/img/small-logos/bootstrap.svg">
                                                            </a>
                                                        </div>
                                                        <div class="col">
                                                            <h6>Soft UI Dashboard</h6>
                                                            <div class="progress progress-xs mb-0">
                                                                <div class="progress-bar bg-gradient-primary"
                                                                    role="progressbar" aria-valuenow="72" aria-valuemin="0"
                                                                    aria-valuemax="100" style="width: 72%;"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    @include('layouts.footers.auth.footer')
@endsection

@push('js')
    <script src="/assets/js/plugins/chartjs.min.js"></script>
    <script>
        (function() {
            const container = document.getElementById("globe");
            const canvas = container.getElementsByTagName("canvas")[0];

            const globeRadius = 100;
            const globeWidth = 4098 / 2;
            const globeHeight = 1968 / 2;

            function convertFlatCoordsToSphereCoords(x, y) {
                let latitude = ((x - globeWidth) / globeWidth) * -180;
                let longitude = ((y - globeHeight) / globeHeight) * -90;
                latitude = (latitude * Math.PI) / 180;
                longitude = (longitude * Math.PI) / 180;
                const radius = Math.cos(longitude) * globeRadius;

                return {
                    x: Math.cos(latitude) * radius,
                    y: Math.sin(longitude) * globeRadius,
                    z: Math.sin(latitude) * radius
                };
            }

            function makeMagic(points) {
                const {
                    width,
                    height
                } = container.getBoundingClientRect();

                // 1. Setup scene
                const scene = new THREE.Scene();
                // 2. Setup camera
                const camera = new THREE.PerspectiveCamera(45, width / height);
                // 3. Setup renderer
                const renderer = new THREE.WebGLRenderer({
                    canvas,
                    antialias: true
                });
                renderer.setSize(width, height);
                // 4. Add points to canvas
                // - Single geometry to contain all points.
                const mergedGeometry = new THREE.Geometry();
                // - Material that the dots will be made of.
                const pointGeometry = new THREE.SphereGeometry(0.5, 1, 1);
                const pointMaterial = new THREE.MeshBasicMaterial({
                    color: "#989db5",
                });

                for (let point of points) {
                    const {
                        x,
                        y,
                        z
                    } = convertFlatCoordsToSphereCoords(
                        point.x,
                        point.y,
                        width,
                        height
                    );

                    if (x && y && z) {
                        pointGeometry.translate(x, y, z);
                        mergedGeometry.merge(pointGeometry);
                        pointGeometry.translate(-x, -y, -z);
                    }
                }

                const globeShape = new THREE.Mesh(mergedGeometry, pointMaterial);
                scene.add(globeShape);

                container.classList.add("peekaboo");

                // Setup orbital controls
                camera.orbitControls = new THREE.OrbitControls(camera, canvas);
                camera.orbitControls.enableKeys = false;
                camera.orbitControls.enablePan = false;
                camera.orbitControls.enableZoom = false;
                camera.orbitControls.enableDamping = false;
                camera.orbitControls.enableRotate = true;
                camera.orbitControls.autoRotate = true;
                camera.position.z = -265;

                function animate() {
                    // orbitControls.autoRotate is enabled so orbitControls.update
                    // must be called inside animation loop.
                    camera.orbitControls.update();
                    requestAnimationFrame(animate);
                    renderer.render(scene, camera);
                }
                animate();
            }

            function hasWebGL() {
                const gl =
                    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                if (gl && gl instanceof WebGLRenderingContext) {
                    return true;
                } else {
                    return false;
                }
            }

            function init() {
                if (hasWebGL()) {
                    window
                    window.fetch(
                            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-dashboard-pro/assets/js/points.json"
                            )
                        .then(response => response.json())
                        .then(data => {
                            makeMagic(data.points);
                        });
                }
            }
            init();
        })();
    </script>
@endpush
