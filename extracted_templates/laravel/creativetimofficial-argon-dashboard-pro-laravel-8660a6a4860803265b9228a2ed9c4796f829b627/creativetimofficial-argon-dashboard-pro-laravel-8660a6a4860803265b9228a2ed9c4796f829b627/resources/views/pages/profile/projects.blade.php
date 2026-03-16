@extends('layouts.app')

@section('content')
    <div class="main-content position-relative max-height-vh-100 h-100">
        <!-- Navbar -->
        <nav
            class="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2 mt-n11">
            <div class="container-fluid py-1">
                @include('layouts.navbars.auth.topnav', ['title' => 'All Projects'])
                <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none">
                    <a href="javascript:;" class="nav-link text-white p-0">
                        <div class="sidenav-toggler-inner">
                            <i class="sidenav-toggler-line bg-white"></i>
                            <i class="sidenav-toggler-line bg-white"></i>
                            <i class="sidenav-toggler-line bg-white"></i>
                        </div>
                    </a>
                </div>
                <div class="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2" id="navbar">
                    <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div class="input-group">
                            <span class="input-group-text text-body"><i class="fas fa-search"
                                    aria-hidden="true"></i></span>
                            <input type="text" class="form-control" placeholder="Type here...">
                        </div>
                    </div>
                    <ul class="navbar-nav justify-content-end">
                        <li class="nav-item d-flex align-items-center">
                            @include('auth.logout')
                        </li>
                        <li class="nav-item d-xl-none ps-3 pe-0 d-flex align-items-center">
                            <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
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
                            <ul class="dropdown-menu dropdown-menu-end px-2 py-3 ms-n4"
                                aria-labelledby="dropdownMenuButton">
                                <li class="mb-2">
                                    <a class="dropdown-item border-radius-md" href="javascript:;">
                                        <div class="d-flex py-1">
                                            <div class="my-auto">
                                                <img src="/assets/img/team-2.jpg" class="avatar avatar-sm me-3"
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
                                                    class="avatar avatar-sm bg-gradient-dark me-3" alt="logo spotify">
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
                                            <div class="avatar avatar-sm bg-gradient-secondary me-3 my-auto">
                                                <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <title>credit-card</title>
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="Rounded-Icons"
                                                            transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF"
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
        <div class="card shadow-lg mx-4 card-profile-bottom">
            <div class="card-body p-3">
                <div class="row gx-4">
                    <div class="col-auto">
                        <div class="avatar avatar-xl position-relative">
                            <img src="/assets/img/team-1.jpg" alt="profile_image" class="w-100 border-radius-lg shadow-sm">
                        </div>
                    </div>
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1">
                                Sayo Kravits
                            </h5>
                            <p class="mb-0 font-weight-bold text-sm">
                                Public Relations
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                        <div class="nav-wrapper position-relative end-0">
                            <ul class="nav nav-pills nav-fill p-1" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center "
                                        data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="true">
                                        <i class="ni ni-app"></i>
                                        <span class="ms-2">App</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center "
                                        data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="false">
                                        <i class="ni ni-email-83"></i>
                                        <span class="ms-2">Messages</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center "
                                        data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="false">
                                        <i class="ni ni-settings-gear-65"></i>
                                        <span class="ms-2">Settings</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid py-4">
            <section class="py-3">
                <div class="row">
                    <div class="col-md-8 me-auto text-left">
                        <h5>Some of Our Awesome Projects</h5>
                        <p>This is the paragraph where you can write more details about your projects. Keep you user engaged
                            by providing meaningful information.</p>
                    </div>
                </div>
                <div class="row mt-lg-4 mt-2">
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="avatar avatar-xl bg-gradient-dark border-radius-md p-2">
                                        <img src="/assets/img/small-logos/logo-slack.svg" alt="slack_logo">
                                    </div>
                                    <div class="ms-3 my-auto">
                                        <h6>Slack Bot</h6>
                                        <div class="avatar-group">
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-3.jpg"
                                                    class="">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Michael Lewis">
                                                <img alt="Image placeholder" src="/assets/img/team-2.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-3.jpg"
                                                    class="">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="rounded-circle">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="ms-auto">
                                        <div class="dropdown">
                                            <button class="btn btn-link text-secondary ps-0 pe-2"
                                                id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="fa fa-ellipsis-v text-lg"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end me-sm-n4 me-n3"
                                                aria-labelledby="navbarDropdownMenuLink">
                                                <a class="dropdown-item" href="javascript:;">Action</a>
                                                <a class="dropdown-item" href="javascript:;">Another action</a>
                                                <a class="dropdown-item" href="javascript:;">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm mt-3"> If everything I did failed - which it doesn&#39;t, I think that
                                    it actually succeeds. </p>
                                <hr class="horizontal dark">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="text-sm mb-0">5</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Participants</p>
                                    </div>
                                    <div class="col-6 text-end">
                                        <h6 class="text-sm mb-0">02.03.22</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Due date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="avatar avatar-xl bg-gradient-dark border-radius-md p-2">
                                        <img src="/assets/img/small-logos/logo-spotify.svg" alt="spotify_logo">
                                    </div>
                                    <div class="ms-3 my-auto">
                                        <h6>Premium support</h6>
                                        <div class="avatar-group">
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-3.jpg"
                                                    class="">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Michael Lewis">
                                                <img alt="Image placeholder" src="/assets/img/team-2.jpg"
                                                    class="rounded-circle">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="ms-auto">
                                        <div class="dropdown">
                                            <button class="btn btn-link text-secondary ps-0 pe-2"
                                                id="navbarDropdownMenuLink1" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="fa fa-ellipsis-v text-lg"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end me-sm-n4 me-n3"
                                                aria-labelledby="navbarDropdownMenuLink1">
                                                <a class="dropdown-item" href="javascript:;">Action</a>
                                                <a class="dropdown-item" href="javascript:;">Another action</a>
                                                <a class="dropdown-item" href="javascript:;">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm mt-3"> Pink is obviously a better color. Everyone’s born confident, and
                                    everything’s taken away from you. </p>
                                <hr class="horizontal dark">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="text-sm mb-0">3</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Participants</p>
                                    </div>
                                    <div class="col-6 text-end">
                                        <h6 class="text-sm mb-0">22.11.21</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Due date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="avatar avatar-xl bg-gradient-dark border-radius-md p-2">
                                        <img src="/assets/img/small-logos/logo-xd.svg" alt="xd_logo">
                                    </div>
                                    <div class="ms-3 my-auto">
                                        <h6>Design tools</h6>
                                        <div class="avatar-group">
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Michael Lewis">
                                                <img alt="Image placeholder" src="/assets/img/team-2.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-3.jpg"
                                                    class="">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="ms-auto">
                                        <div class="dropdown">
                                            <button class="btn btn-link text-secondary ps-0 pe-2"
                                                id="navbarDropdownMenuLink2" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="fa fa-ellipsis-v text-lg"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end me-sm-n4 me-n3"
                                                aria-labelledby="navbarDropdownMenuLink2">
                                                <a class="dropdown-item" href="javascript:;">Action</a>
                                                <a class="dropdown-item" href="javascript:;">Another action</a>
                                                <a class="dropdown-item" href="javascript:;">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm mt-3"> Constantly growing. We’re constantly making mistakes from which
                                    we learn and improve. </p>
                                <hr class="horizontal dark">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="text-sm mb-0">4</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Participants</p>
                                    </div>
                                    <div class="col-6 text-end">
                                        <h6 class="text-sm mb-0">06.03.20</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Due date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="avatar avatar-xl bg-gradient-dark border-radius-md p-2">
                                        <img src="/assets/img/small-logos/logo-asana.svg" alt="asana_logo">
                                    </div>
                                    <div class="ms-3 my-auto">
                                        <h6>Looking great</h6>
                                        <div class="avatar-group">
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-3.jpg"
                                                    class="">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Michael Lewis">
                                                <img alt="Image placeholder" src="/assets/img/team-2.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-3.jpg"
                                                    class="">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Michael Lewis">
                                                <img alt="Image placeholder" src="/assets/img/team-2.jpg"
                                                    class="rounded-circle">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="ms-auto">
                                        <div class="dropdown">
                                            <button class="btn btn-link text-secondary ps-0 pe-2"
                                                id="navbarDropdownMenuLink3" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="fa fa-ellipsis-v text-lg"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end me-sm-n4 me-n3"
                                                aria-labelledby="navbarDropdownMenuLink3">
                                                <a class="dropdown-item" href="javascript:;">Action</a>
                                                <a class="dropdown-item" href="javascript:;">Another action</a>
                                                <a class="dropdown-item" href="javascript:;">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm mt-3"> You have the opportunity to play this game of life you need to
                                    appreciate every moment. </p>
                                <hr class="horizontal dark">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="text-sm mb-0">6</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Participants</p>
                                    </div>
                                    <div class="col-6 text-end">
                                        <h6 class="text-sm mb-0">14.03.24</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Due date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div class="d-flex">
                                    <div class="avatar avatar-xl bg-gradient-dark border-radius-md p-2">
                                        <img src="/assets/img/small-logos/logo-invision.svg" alt="invision_logo">
                                    </div>
                                    <div class="ms-3 my-auto">
                                        <h6>Developer First</h6>
                                        <div class="avatar-group">
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-3.jpg"
                                                    class="">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Michael Lewis">
                                                <img alt="Image placeholder" src="/assets/img/team-2.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-bs-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-4.jpg"
                                                    class="rounded-circle">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="ms-auto">
                                        <div class="dropdown">
                                            <button class="btn btn-link text-secondary ps-0 pe-2"
                                                id="navbarDropdownMenuLink4" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="fa fa-ellipsis-v text-lg"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end me-sm-n4 me-n3"
                                                aria-labelledby="navbarDropdownMenuLink4">
                                                <a class="dropdown-item" href="javascript:;">Action</a>
                                                <a class="dropdown-item" href="javascript:;">Another action</a>
                                                <a class="dropdown-item" href="javascript:;">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm mt-3"> For standing out. But the time is now to be okay to be the
                                    greatest you. </p>
                                <hr class="horizontal dark">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="text-sm mb-0">4</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Participants</p>
                                    </div>
                                    <div class="col-6 text-end">
                                        <h6 class="text-sm mb-0">16.01.22</h6>
                                        <p class="text-secondary text-sm font-weight-bold mb-0">Due date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body d-flex flex-column justify-content-center text-center">
                                <a href="javascript:;">
                                    <i class="fa fa-plus text-secondary mb-3"></i>
                                    <h5 class=" text-secondary"> New project </h5>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            @include('layouts.footers.auth.footer')
        </div>
    </div>
@endsection
