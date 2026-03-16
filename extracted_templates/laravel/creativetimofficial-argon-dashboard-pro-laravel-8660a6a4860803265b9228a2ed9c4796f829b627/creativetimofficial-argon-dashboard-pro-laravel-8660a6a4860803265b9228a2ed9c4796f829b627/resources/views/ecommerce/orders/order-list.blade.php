@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Oder List'])
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
    <div class="container-fluid py-4">
        <div class="d-sm-flex justify-content-between">
            <div>
                <a href="javascript:;" class="btn btn-icon btn-outline-white">
                    New order
                </a>
            </div>
            <div class="d-flex">
                <div class="dropdown d-inline">
                    <a href="javascript:;" class="btn btn-outline-white dropdown-toggle " data-bs-toggle="dropdown"
                        id="navbarDropdownMenuLink2">
                        Filters
                    </a>
                    <ul class="dropdown-menu dropdown-menu-lg-start px-2 py-3" aria-labelledby="navbarDropdownMenuLink2"
                        data-popper-placement="left-start">
                        <li><a class="dropdown-item border-radius-md" href="javascript:;">Status: Paid</a></li>
                        <li><a class="dropdown-item border-radius-md" href="javascript:;">Status: Refunded</a></li>
                        <li><a class="dropdown-item border-radius-md" href="javascript:;">Status: Canceled</a></li>
                        <li>
                            <hr class="horizontal dark my-2">
                        </li>
                        <li><a class="dropdown-item border-radius-md text-danger" href="javascript:;">Remove
                                Filter</a></li>
                    </ul>
                </div>
                <button class="btn btn-icon btn-outline-white ms-2 export" data-type="csv" type="button">
                    <span class="btn-inner--icon"><i class="ni ni-archive-2"></i></span>
                    <span class="btn-inner--text">Export CSV</span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="table-responsive">
                        <table class="table table-flush" id="datatable-search">
                            <thead class="thead-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck1">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10421</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">1 Nov, 10:20 AM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <img src="../../../assets/img/team-2.jpg" class="avatar avatar-xs me-2"
                                                alt="user image">
                                            <span>Orlando Imieto</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">Nike Sport V2</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$140,20</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check pt-0">
                                                <input class="form-check-input" type="checkbox" id="customCheck2">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10422</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">1 Nov, 10:53 AM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <img src="../../../assets/img/team-1.jpg" class="avatar avatar-xs me-2"
                                                alt="user image">
                                            <span>Alice Murinho</span>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">Valvet T-shirt</span>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">$42,00</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck3">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10423</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">1 Nov, 11:13 AM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-dark mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-undo" aria-hidden="true"></i></button>
                                            <span>Refunded</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-xs me-2 bg-gradient-dark">
                                                <span>M</span>
                                            </div>
                                            <span>Michael Mirra</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Leather Wallet
                                            <span class="text-secondary ms-2"> +1 more </span>
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$25,50</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck4">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10424</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">1 Nov, 12:20 PM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex align-items-center">
                                                <img src="../../../assets/img/team-3.jpg" class="avatar avatar-xs me-2"
                                                    alt="user image">
                                                <span>Andrew Nichel</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Bracelet Onu-Lino
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$19,40</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck5">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10425</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">1 Nov, 1:40 PM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-times" aria-hidden="true"></i></button>
                                            <span>Canceled</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex align-items-center">
                                                <img src="../../../assets/img/team-4.jpg" class="avatar avatar-xs me-2"
                                                    alt="user image">
                                                <span>Sebastian Koga</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Phone Case Pink
                                            <span class="text-secondary ms-2"> x 2 </span>
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$44,90</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck6">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10426</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">1 Nov, 2:19 AM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-xs me-2 bg-gradient-primary">
                                                <span>L</span>
                                            </div>
                                            <span>Laur Gilbert</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Backpack Niver
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$112,50</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck7">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10427</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">1 Nov, 3:42 AM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-xs me-2 bg-gradient-dark">
                                                <span>I</span>
                                            </div>
                                            <span>Iryna Innda</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Adidas Vio
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$200,00</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck8">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10428</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">2 Nov, 9:32 AM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-xs me-2 bg-gradient-dark">
                                                <span>A</span>
                                            </div>
                                            <span>Arrias Liunda</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Airpods 2 Gen
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$350,00</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck9">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10429</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">2 Nov, 10:14 AM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex align-items-center">
                                                <img src="../../../assets/img/team-5.jpg" class="avatar avatar-xs me-2"
                                                    alt="user image">
                                                <span>Rugna Ilpio</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Bracelet Warret
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$15,00</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck10">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10430</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">2 Nov, 12:56 PM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-dark mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-undo" aria-hidden="true"></i></button>
                                            <span>Refunded</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex align-items-center">
                                                <img src="../../../assets/img/ivana-squares.jpg"
                                                    class="avatar avatar-xs me-2" alt="user image">
                                                <span>Anna Landa</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Watter Bottle India
                                            <span class="text-secondary ms-2"> x 3 </span>
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$25,00</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck11">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10431</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">2 Nov, 3:12 PM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-xs me-2 bg-gradient-dark">
                                                <span>K</span>
                                            </div>
                                            <span>Karl Innas</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Kitchen Gadgets
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$164,90</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="customCheck12">
                                            </div>
                                            <p class="text-xs font-weight-bold ms-2 mb-0">#10432</p>
                                        </div>
                                    </td>
                                    <td class="font-weight-bold">
                                        <span class="my-2 text-xs">2 Nov, 5:12 PM</span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <button
                                                class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i
                                                    class="fas fa-check" aria-hidden="true"></i></button>
                                            <span>Paid</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-xs me-2 bg-gradient-info">
                                                <span>O</span>
                                            </div>
                                            <span>Oana Kilas</span>
                                        </div>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">
                                            Office Papers
                                        </span>
                                    </td>
                                    <td class="text-xs font-weight-bold">
                                        <span class="my-2 text-xs">$23,90</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            @include('layouts.footers.auth.footer')
        </div>
    </div>
@endsection

@push('js')
    <script src="/assets/js/plugins/datatables.js"></script>
    <script>
        const dataTableSearch = new simpleDatatables.DataTable("#datatable-search", {
            searchable: true,
            fixedHeight: false,
            perPageSelect: false
        });

        document.querySelectorAll(".export").forEach(function(el) {
            el.addEventListener("click", function(e) {
                var type = el.dataset.type;

                var data = {
                    type: type,
                    filename: "soft-ui-" + type,
                };

                if (type === "csv") {
                    data.columnDelimiter = "|";
                }

                dataTableSearch.export(data);
            });
        });
    </script>
@endpush
