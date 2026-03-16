@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Timeline'])
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
        <div class="row gx-4">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header pb-0">
                        <h6>Timeline with dotted line</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="timeline timeline-one-side" data-timeline-axis-style="dotted">
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i class="ni ni-bell-55 text-success text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-success">Design</span>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i class="ni ni-html5 text-danger text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">New order #1832412</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 11 PM</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-danger">Order</span>
                                    <span class="badge badge-sm bg-gradient-danger">#1832412</span>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i class="ni ni-cart text-info text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">Server payments for April</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 9:34 PM</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-info">Server</span>
                                    <span class="badge badge-sm bg-gradient-info">Payments</span>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i class="ni ni-credit-card text-warning text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">New card added for order #4395133
                                    </h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">20 DEC 2:20 AM</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-warning">Card</span>
                                    <span class="badge badge-sm bg-gradient-warning">#4395133</span>
                                    <span class="badge badge-sm bg-gradient-warning">Priority</span>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i class="ni ni-key-25 text-primary text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">Unlock packages for development
                                    </h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">18 DEC 4:54 AM</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-primary">Development</span>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step">
                                    <i class="ni ni-archive-2 text-success text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">New message unread</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">16 DEC</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-success">Message</span>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step">
                                    <i class="ni ni-check-bold text-info text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">Notifications unread</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">15 DEC</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step">
                                    <i class="ni ni-box-2 text-warning text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">New request</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">14 DEC</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-warning">Request</span>
                                    <span class="badge badge-sm bg-gradient-warning">Priority</span>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step">
                                    <i class="ni ni-controller text-dark text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-dark text-sm font-weight-bold mb-0">Controller issues</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">13 DEC</p>
                                    <p class="text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-dark">Controller</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 mt-4 mt-lg-0">
                <div class="card bg-gradient-dark">
                    <div class="card-header bg-transparent pb-0">
                        <h6 class="text-white">Timeline dark with dashed line</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="timeline timeline-one-side" data-timeline-axis-style="dashed">
                            <div class="timeline-block mb-3">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-bell-55 text-success text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-success">Design</span>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-html5 text-danger text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">New order #1832412</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 11 PM</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-danger">Order</span>
                                    <span class="badge badge-sm bg-gradient-danger">#1832412</span>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-cart text-info text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">Server payments for April</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 9:34 PM</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-info">Server</span>
                                    <span class="badge badge-sm bg-gradient-info">Payments</span>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-credit-card text-warning text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">New card added for order #4395133
                                    </h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">20 DEC 2:20 AM</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-warning">Card</span>
                                    <span class="badge badge-sm bg-gradient-warning">#4395133</span>
                                    <span class="badge badge-sm bg-gradient-warning">Priority</span>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-key-25 text-primary text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">Unlock packages for development
                                    </h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">18 DEC 4:54 AM</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-primary">Development</span>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-archive-2 text-success text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">New message unread</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">16 DEC</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-success">Message</span>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-check-bold text-info text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">Notifications unread</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">15 DEC</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-box-2 text-warning text-gradient"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">New request</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">14 DEC</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-warning">Request</span>
                                    <span class="badge badge-sm bg-gradient-warning">Priority</span>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step bg-dark">
                                    <i class="ni ni-controller text-white"></i>
                                </span>
                                <div class="timeline-content">
                                    <h6 class="text-white text-sm font-weight-bold mb-0">Controller issues</h6>
                                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">13 DEC</p>
                                    <p class="text-secondary text-sm mt-3 mb-2">
                                        People care about how you see the world, how you think, what motivates you, what
                                        you’re struggling with or afraid of.
                                    </p>
                                    <span class="badge badge-sm bg-gradient-dark">Controller</span>
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
