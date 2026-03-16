@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'General'])
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
                                            <img src="/assets/img/team-2.jpg" class="avatar avatar-sm  me-3 "
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
                                            <img src="/assets/img/small-logos/logo-spotify.svg"
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
        <div class="row mt-n2">
            <div class="col-lg-8 col-12">
                <div class="row">
                    <div class="col-lg-4 col-12">
                        <div class="card card-background card-background-mask-info h-100">
                            <div class="full-background" style="background-image: url('/assets/img/img-1-1200x1000.jpg')">
                            </div>
                            <div class="card-body pt-4 text-center">
                                <h6 class="text-white mb-0">Earnings</h6>
                                <h3 class="text-white">$15,800</h3>
                                <span class="badge d-block bg-gradient-dark mb-2">+15% since last week</span>
                                <p>They're slowed down by their perception of themselves. </p>
                                <a href="javascript:;" class="btn btn-outline-white btn-sm px-5 mb-0">View more</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="numbers">
                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Today's Money</p>
                                        <h5 class="font-weight-bolder mb-0">$87,000</h5>
                                    </div>
                                    <div class="icon icon-shape bg-gradient-dark text-center rounded-circle ms-auto">
                                        <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <p class="mb-0">
                                    <span class="text-success text-sm font-weight-bolder">+12%</span>
                                    since last month
                                </p>
                            </div>
                        </div>
                        <div class="card mt-4">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="numbers">
                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Sessions</p>
                                        <h5 class="font-weight-bolder mb-0">9,600</h5>
                                    </div>
                                    <div class="icon icon-shape bg-gradient-dark text-center rounded-circle ms-auto">
                                        <i class="ni ni-planet text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <p class="mb-0">
                                    <span class="text-success text-sm font-weight-bolder">+2%</span>
                                    since yesterday
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="numbers">
                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Today's Users</p>
                                        <h5 class="font-weight-bolder mb-0">2,300</h5>
                                    </div>
                                    <div class="icon icon-shape bg-gradient-dark text-center rounded-circle ms-auto">
                                        <i class="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <p class="mb-0">
                                    <span class="text-danger text-sm font-weight-bolder">-1%</span>
                                    since last week
                                </p>
                            </div>
                        </div>
                        <div class="card mt-4">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="numbers">
                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Sign-ups</p>
                                        <h5 class="font-weight-bolder mb-0">348</h5>
                                    </div>
                                    <div class="icon icon-shape bg-gradient-dark text-center rounded-circle ms-auto">
                                        <i class="ni ni-shop text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <p class="mb-0">
                                    <span class="text-success text-sm font-weight-bolder">+12%</span>
                                    since last quarter
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-12 mt-4 mt-lg-0">
                <div class="card">
                    <div class="card-header p-3 pb-0">
                        <div class="row">
                            <div class="col-8 d-flex">
                                <div>
                                    <img src="/assets/img/team-3.jpg" class="avatar avatar-sm me-2" alt="avatar image">
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">Lucas Prila</h6>
                                    <p class="text-xs">2h ago</p>
                                </div>
                            </div>
                            <div class="col-4">
                                <span class="badge bg-gradient-info ms-auto float-end">Recommendation</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3 pt-1">
                        <h6>I need a Ruby developer for my new website.</h6>
                        <p class="text-sm">The website was initially built in PHP, I need a professional ruby
                            programmer to shift it.</p>
                        <div class="d-flex bg-gray-100 border-radius-lg p-3">
                            <h4 class="my-auto">
                                <span class="text-secondary text-sm me-1">$</span>3,000<span
                                    class="text-secondary text-sm ms-1">/ month </span>
                            </h4>
                            <a href="javascript:;" class="btn btn-outline-dark mb-0 ms-auto">Apply</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-8 col-12">
                <div class="card">
                    <div class="card-header p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="mb-0">To do list</h6>
                            </div>
                            <div class="col-md-6 d-flex justify-content-end align-items-center">
                                <small>23 - 30 March 2020</small>
                            </div>
                        </div>
                        <hr class="horizontal dark mb-0">
                    </div>
                    <div class="card-body p-3 pt-0">
                        <ul class="list-group list-group-flush" data-toggle="checklist">
                            <li class="list-group-item border-0 flex-column align-items-start ps-0 py-0 mb-3">
                                <div class="checklist-item checklist-item-primary ps-2 ms-3">
                                    <div class="d-flex align-items-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        </div>
                                        <h6 class="mb-0 text-dark font-weight-bold text-sm">Check status</h6>
                                        <div class="dropdown float-lg-end ms-auto pe-4">
                                            <a href="javascript:;" class="cursor-pointer" id="dropdownTable2"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa fa-ellipsis-h text-secondary" aria-hidden="true"></i>
                                            </a>
                                            <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                                                aria-labelledby="dropdownTable2" style="">
                                                <li><a class="dropdown-item border-radius-md"
                                                        href="javascript:;">Action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Another
                                                        action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Something
                                                        else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center ms-4 mt-3 ps-1">
                                        <div>
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Date</p>
                                            <span class="text-xs font-weight-bolder">24 March 2019</span>
                                        </div>
                                        <div class="ms-auto">
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Project</p>
                                            <span class="text-xs font-weight-bolder">2414_VR4sf3#</span>
                                        </div>
                                        <div class="mx-auto">
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Company</p>
                                            <span class="text-xs font-weight-bolder">Creative Tim</span>
                                        </div>
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-4 mb-0">
                            </li>
                            <li class="list-group-item border-0 flex-column align-items-start ps-0 py-0 mb-3">
                                <div class="checklist-item checklist-item-dark ps-2 ms-3">
                                    <div class="d-flex align-items-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1"
                                                checked>
                                        </div>
                                        <h6 class="mb-0 text-dark font-weight-bold text-sm">Management discussion</h6>
                                        <div class="dropdown float-lg-end ms-auto pe-4">
                                            <a href="javascript:;" class="cursor-pointer" id="dropdownTable3"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa fa-ellipsis-h text-secondary" aria-hidden="true"></i>
                                            </a>
                                            <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                                                aria-labelledby="dropdownTable3" style="">
                                                <li><a class="dropdown-item border-radius-md"
                                                        href="javascript:;">Action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Another
                                                        action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Something
                                                        else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center ms-4 mt-3 ps-1">
                                        <div>
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Date</p>
                                            <span class="text-xs font-weight-bolder">24 March 2019</span>
                                        </div>
                                        <div class="ms-auto">
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Project</p>
                                            <span class="text-xs font-weight-bolder">4411_8sIsdd23</span>
                                        </div>
                                        <div class="mx-auto">
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Company</p>
                                            <span class="text-xs font-weight-bolder">Apple</span>
                                        </div>
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-4 mb-0">
                            </li>
                            <li class="list-group-item border-0 flex-column align-items-start ps-0 py-0 mb-3">
                                <div class="checklist-item checklist-item-warning ps-2 ms-3">
                                    <div class="d-flex align-items-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2"
                                                checked>
                                        </div>
                                        <h6 class="mb-0 text-dark font-weight-bold text-sm">New channel distribution</h6>
                                        <div class="dropdown float-lg-end ms-auto pe-4">
                                            <a href="javascript:;" class="cursor-pointer" id="dropdownTable"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa fa-ellipsis-h text-secondary" aria-hidden="true"></i>
                                            </a>
                                            <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                                                aria-labelledby="dropdownTable" style="">
                                                <li><a class="dropdown-item border-radius-md"
                                                        href="javascript:;">Action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Another
                                                        action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Something
                                                        else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center ms-4 mt-3 ps-1">
                                        <div>
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Date</p>
                                            <span class="text-xs font-weight-bolder">25 March 2019</span>
                                        </div>
                                        <div class="ms-auto">
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Project</p>
                                            <span class="text-xs font-weight-bolder">827d_kdl33D1s</span>
                                        </div>
                                        <div class="mx-auto">
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Company</p>
                                            <span class="text-xs font-weight-bolder">Slack</span>
                                        </div>
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-4 mb-0">
                            </li>
                            <li class="list-group-item border-0 flex-column align-items-start ps-0 py-0 mb-3">
                                <div class="checklist-item checklist-item-success ps-2 ms-3">
                                    <div class="d-flex align-items-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value=""
                                                id="flexCheckDefault3">
                                        </div>
                                        <h6 class="mb-0 text-dark font-weight-bold text-sm">IOS App development</h6>
                                        <div class="dropdown float-lg-end ms-auto pe-4">
                                            <a href="javascript:;" class="cursor-pointer" id="dropdownTable1"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa fa-ellipsis-h text-secondary" aria-hidden="true"></i>
                                            </a>
                                            <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                                                aria-labelledby="dropdownTable1" style="">
                                                <li><a class="dropdown-item border-radius-md"
                                                        href="javascript:;">Action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Another
                                                        action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Something
                                                        else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center ms-4 mt-3 ps-1">
                                        <div>
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Date</p>
                                            <span class="text-xs font-weight-bolder">26 March 2019</span>
                                        </div>
                                        <div class="ms-auto">
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Project</p>
                                            <span class="text-xs font-weight-bolder">88s1_349DA2sa</span>
                                        </div>
                                        <div class="mx-auto">
                                            <p class="text-xs mb-0 text-secondary font-weight-bold">Company</p>
                                            <span class="text-xs font-weight-bolder">Facebook</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-12 mt-4 mt-lg-0">
                <div class="card overflow-hidden">
                    <div class="card-header p-3 pb-0">
                        <div class="d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-info shadow text-center border-radius-md">
                                <i class="ni ni-calendar-grid-58 text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                            <div class="ms-3">
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">Tasks</p>
                                <h5 class="font-weight-bolder mb-0">
                                    480
                                </h5>
                            </div>
                            <div class="progress-wrapper ms-auto w-25">
                                <div class="progress-info">
                                    <div class="progress-percentage">
                                        <span class="text-xs font-weight-bold">60%</span>
                                    </div>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow="60"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body mt-3 p-0">
                        <div class="chart">
                            <canvas id="chart-line" class="chart-canvas" height="100"></canvas>
                        </div>
                    </div>
                </div>
                <div class="card overflow-hidden mt-4">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-lg-5">
                                <div class="d-flex">
                                    <div class="icon icon-shape bg-gradient-info shadow text-center border-radius-md">
                                        <i class="ni ni-delivery-fast text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                    <div class="ms-3">
                                        <p class="text-sm mb-0 text-capitalize font-weight-bold">Projects</p>
                                        <h5 class="font-weight-bolder mb-0">
                                            115
                                        </h5>
                                    </div>
                                </div>
                                <span class="badge badge-dot d-block text-start pb-0 mt-3">
                                    <i class="bg-gradient-info"></i>
                                    <span class="text-muted text-xs font-weight-bold">Done</span>
                                </span>
                                <span class="badge badge-dot d-block text-start">
                                    <i class="bg-gradient-secondary"></i>
                                    <span class="text-muted text-xs font-weight-bold">In progress</span>
                                </span>
                            </div>
                            <div class="col-lg-7 my-auto">
                                <div class="chart ms-auto">
                                    <canvas id="chart-bar" class="chart-canvas" height="150"></canvas>
                                </div>
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
    <script src="/assets/js/plugins/chartjs.min.js"></script>
    <!--  Plugin for TiltJS, full documentation here: https://gijsroge.github.io/tilt.js/ -->
    <script src="/assets/js/plugins/tilt.min.js"></script>
    <script>
        var ctx1 = document.getElementById("chart-line").getContext("2d");
        var ctx2 = document.getElementById("chart-bar").getContext("2d");

        var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(33,82,255,0.1)');
        gradientStroke1.addColorStop(0.2, 'rgba(33,82,255,0.0)');
        gradientStroke1.addColorStop(0, 'rgba(33,82,255,0)'); //purple colors

        new Chart(ctx1, {
            type: "line",
            data: {
                labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Tasks",
                    tension: 0.3,
                    pointRadius: 2,
                    pointBackgroundColor: "#2152ff",
                    borderColor: "#2152ff",
                    borderWidth: 2,
                    backgroundColor: gradientStroke1,
                    data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
                    maxBarThickness: 6,
                    fill: true
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                        },
                        ticks: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                        },
                        ticks: {
                            color: '#252f40',
                            padding: 10
                        }
                    },
                    y: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            padding: 10,
                            color: '#9ca2b7'
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            padding: 10,
                            color: '#9ca2b7'
                        }
                    },
                },
            },
        });

        new Chart(ctx2, {
            type: "doughnut",
            data: {
                labels: ['Done', 'In progress'],
                datasets: [{
                    label: "Projects",
                    weight: 9,
                    cutout: 50,
                    tension: 0.9,
                    pointRadius: 2,
                    borderWidth: 2,
                    backgroundColor: ['#2152ff', '#a8b8d8'],
                    data: [75, 25],
                    fill: false
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                        },
                        ticks: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                        },
                        ticks: {
                            display: false,
                        }
                    },
                },
            },
        });
    </script>
@endpush
