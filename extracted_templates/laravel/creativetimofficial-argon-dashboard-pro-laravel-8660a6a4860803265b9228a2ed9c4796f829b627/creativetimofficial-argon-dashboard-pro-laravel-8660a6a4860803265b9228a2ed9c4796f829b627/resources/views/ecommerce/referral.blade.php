@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Referral'])
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
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header p-3">
                        <h5 class="mb-2">Referral Program</h5>
                        <p class="mb-0">Track and find all the details about our referral program, your stats and
                            revenues.</p>
                    </div>
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-lg-3 col-6 text-center">
                                <div class="border-dashed border-1 border-secondary border-radius-md py-3">
                                    <h6 class="text-primary mb-0">Earnings</h6>
                                    <h4 class="font-weight-bolder"><span class="small">$ </span><span id="state1"
                                            countTo="23980"></span></h4>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6 text-center">
                                <div class="border-dashed border-1 border-secondary border-radius-md py-3">
                                    <h6 class="text-primary mb-0">Customers</h6>
                                    <h4 class="font-weight-bolder"><span class="small">$ </span><span id="state2"
                                            countTo="2400"></span></h4>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6 text-center mt-4 mt-lg-0">
                                <div class="border-dashed border-1 border-secondary border-radius-md py-3">
                                    <h6 class="text-primary mb-0">Avg. Value</h6>
                                    <h4 class="font-weight-bolder"><span class="small">$ </span><span id="state3"
                                            countTo="48"></span></h4>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6 text-center mt-4 mt-lg-0">
                                <div class="border-dashed border-1 border-secondary border-radius-md py-3">
                                    <h6 class="text-primary mb-0">Refund Rate</h6>
                                    <h4 class="font-weight-bolder"><span id="state4" countTo="4"></span><span
                                            class="small"> %</span></h4>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-lg-5 col-12">
                                <h6 class="mb-0">Referral Code</h6>
                                <p class="text-sm">Copy the code bellow to your registered provider.</p>
                                <div class="border-dashed border-1 border-secondary border-radius-md p-3">
                                    <p class="text-xs mb-2">Generated 23 days ago by <span
                                            class="font-weight-bolder">softuidash23</span></p>
                                    <p class="text-xs mb-3"><span class="font-weight-bolder">(Used one time)</span></p>
                                    <div class="d-flex align-items-center">
                                        <div class="form-group w-70">
                                            <div class="input-group bg-gray-200">
                                                <input class="form-control form-control-sm" value="argon-dashboard-vmsk392"
                                                    type="text" disabled>
                                                <span class="input-group-text bg-transparent" data-bs-toggle="tooltip"
                                                    data-bs-placement="top" title="Referral code expires in 24 hours"><i
                                                        class="ni ni-key-25"></i></span>
                                            </div>
                                        </div>
                                        <a href="javascript:;" class="btn btn-sm btn-outline-secondary ms-2 px-3">Copy</a>
                                    </div>
                                    <p class="text-xs mb-1">You cannot generate codes.</p>
                                    <p class="text-xs mb-0"><a href="javascript:;">Contact us</a> to generate more
                                        referrals link.</p>
                                </div>
                            </div>
                            <div class="col-lg-7 col-12 mt-4 mt-lg-0">
                                <h6 class="mb-0">How to use</h6>
                                <p class="text-sm">Integrate your referral code in 3 easy steps.</p>
                                <div class="row">
                                    <div class="col-md-4 col-12">
                                        <div class="card card-plain text-center">
                                            <div class="card-body">
                                                <div
                                                    class="icon icon-shape bg-gradient-dark shadow text-center border-radius-md mb-2">
                                                    <i class="ni ni-money-coins opacity-10" aria-hidden="true"></i>
                                                </div>
                                                <p class="text-sm font-weight-bold mb-2">1. Create & validate your referral
                                                    link and get </p>
                                                <h5 class="font-weight-bolder"><span class="small">$</span>100
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-12">
                                        <div class="card card-plain text-center">
                                            <div class="card-body">
                                                <div
                                                    class="icon icon-shape bg-gradient-dark shadow text-center border-radius-md mb-2">
                                                    <i class="ni ni-send opacity-10" aria-hidden="true"></i>
                                                </div>
                                                <p class="text-sm font-weight-bold mb-2">2. For every order you make you
                                                    get </p>
                                                <h5 class="font-weight-bolder">10<span class="small">%</span>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-12">
                                        <div class="card card-plain text-center">
                                            <div class="card-body">
                                                <div
                                                    class="icon icon-shape bg-gradient-dark shadow text-center border-radius-md mb-2">
                                                    <i class="ni ni-spaceship opacity-10" aria-hidden="true"></i>
                                                </div>
                                                <p class="text-sm font-weight-bold mb-2">3. Get other friends to generate
                                                    link and get </p>
                                                <h5 class="font-weight-bolder"><span class="small">$</span>500
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal dark">
                        <div class="row mt-4">
                            <h6 class="mb-2">Other programs</h6>
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="card text-center">
                                    <div class="overflow-hidden position-relative border-radius-lg bg-cover p-3"
                                        style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/refferal1.jpg')">
                                        <span class="mask bg-gradient-dark opacity-6"></span>
                                        <div class="card-body position-relative z-index-1 d-flex flex-column mt-5">
                                            <p class="text-white font-weight-bolder">User #hashtag in a photo on social
                                                media and get $10 for each purchase you make.</p>
                                            <a class="text-white text-sm font-weight-bold mb-0 icon-move-right mt-4"
                                                href="javascript:;">
                                                Read More
                                                <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0">
                                <div class="card text-center">
                                    <div class="overflow-hidden position-relative border-radius-lg bg-cover p-3"
                                        style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/refferal2.jpg')">
                                        <span class="mask bg-gradient-dark opacity-6"></span>
                                        <div class="card-body position-relative z-index-1 d-flex flex-column mt-5">
                                            <p class="text-white font-weight-bolder">Send the invitation link to 10 friends
                                                and get a 50% coupon to use on any purchase.</p>
                                            <a class="text-white text-sm font-weight-bold mb-0 icon-move-right mt-4"
                                                href="javascript:;">
                                                Read More
                                                <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-12 mt-4 mt-lg-0">
                                <div class="card border-dashed border-1 text-center h-100">
                                    <div class="card-body position-relative z-index-1 d-flex flex-column">
                                        <div
                                            class="position-relative d-flex align-items-center justify-content-center h-100">
                                            <img class="w-50 position-relative z-index-2"
                                                src="../../assets/img/illustrations/icon-documentation.svg"
                                                alt="illustration">
                                        </div>
                                        <a class="text-sm text-secondary font-weight-bold mb-0 icon-move-right mt-2"
                                            href="javascript:;">
                                            Join rocketship program
                                            <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="card mb-4">
                    <div class="card-header pb-0 p-3">
                        <h6>Top Referred Users</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            User</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Value</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Profit</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Refunds</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="d-flex px-3 py-1">
                                                <div>
                                                    <img src="../../assets/img/team-1.jpg" class="avatar me-3"
                                                        alt="avatar image">
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">Alice Vinget</h6>
                                                    <p class="text-sm font-weight-bold text-secondary mb-0"><span
                                                            class="text-success">8.232</span> orders</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">$130.992</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <p class="text-sm font-weight-bold mb-0">$9.500</p>
                                        </td>
                                        <td class="align-middle text-end">
                                            <div class="d-flex px-3 py-1 justify-content-center align-items-center">
                                                <p class="text-sm font-weight-bold mb-0">13</p>
                                                <i class="ni ni-bold-down text-sm ms-1 mt-1 text-success"></i>
                                                <button type="button"
                                                    class="btn btn-sm btn-icon-only btn-rounded btn-outline-secondary mb-0 ms-2 btn-sm d-flex align-items-center justify-content-center ms-3"
                                                    data-bs-toggle="tooltip" data-bs-placement="bottom" title=""
                                                    data-bs-original-title="Refund rate is lower with 97% than other users">
                                                    <i class="fas fa-info" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex px-3 py-1">
                                                <div>
                                                    <img src="../../assets/img/team-2.jpg" class="avatar me-3"
                                                        alt="avatar image">
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">John Alura</h6>
                                                    <p class="text-sm font-weight-bold text-secondary mb-0"><span
                                                            class="text-success">12.821</span> orders</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">$80.250</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <p class="text-sm font-weight-bold mb-0">$4.200</p>
                                        </td>
                                        <td class="align-middle text-end">
                                            <div class="d-flex px-3 py-1 justify-content-center align-items-center">
                                                <p class="text-sm font-weight-bold mb-0">40</p>
                                                <i class="ni ni-bold-down text-sm ms-1 mt-1 text-success"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex px-3 py-1">
                                                <div>
                                                    <img src="../../assets/img/team-3.jpg" class="avatar me-3"
                                                        alt="avatar image">
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">Andrew Sian</h6>
                                                    <p class="text-sm font-weight-bold text-secondary mb-0"><span
                                                            class="text-success">2.421</span> orders</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">$40.600</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <p class="text-sm font-weight-bold mb-0">$9.430</p>
                                        </td>
                                        <td class="align-middle text-end">
                                            <div class="d-flex px-3 py-1 justify-content-center align-items-center">
                                                <p class="text-sm font-weight-bold mb-0">54</p>
                                                <i class="ni ni-bold-up text-sm ms-1 mt-1 text-danger"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex px-3 py-1">
                                                <div>
                                                    <img src="../../assets/img/team-4.jpg" class="avatar me-3"
                                                        alt="avatar image">
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">Luca Willaim</h6>
                                                    <p class="text-sm font-weight-bold text-secondary mb-0"><span
                                                            class="text-success">5.921</span> orders</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">$91.300</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <p class="text-sm font-weight-bold mb-0">$7.364</p>
                                        </td>
                                        <td class="align-middle text-end">
                                            <div class="d-flex px-3 py-1 justify-content-center align-items-center">
                                                <p class="text-sm font-weight-bold mb-0">5</p>
                                                <i class="ni ni-bold-down text-sm ms-1 mt-1 text-success"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex px-3 py-1">
                                                <div>
                                                    <img src="../../assets/img/team-5.jpg" class="avatar me-3"
                                                        alt="avatar image">
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">Richel Manuel</h6>
                                                    <p class="text-sm font-weight-bold text-secondary mb-0"><span
                                                            class="text-success">921</span> orders</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">$140.925</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <p class="text-sm font-weight-bold mb-0">$20.531</p>
                                        </td>
                                        <td class="align-middle text-end">
                                            <div class="d-flex px-3 py-1 justify-content-center align-items-center">
                                                <p class="text-sm font-weight-bold mb-0">121</p>
                                                <i class="ni ni-bold-up text-sm ms-1 mt-1 text-danger"></i>
                                                <button type="button"
                                                    class="btn btn-sm btn-icon-only btn-rounded btn-outline-secondary mb-0 ms-2 btn-sm d-flex align-items-center justify-content-center ms-3"
                                                    data-bs-toggle="tooltip" data-bs-placement="bottom" title=""
                                                    data-bs-original-title="Refund rate is higher with 70% than other users">
                                                    <i class="fas fa-info" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @include('layouts.footers.auth.footer')
    </div>
@endsection

@push('js')
    <script src="../../assets/js/plugins/countup.min.js"></script>
    <script>
        if (document.getElementById('state1')) {
            const countUp = new CountUp('state1', document.getElementById("state1").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
        if (document.getElementById('state2')) {
            const countUp = new CountUp('state2', document.getElementById("state2").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
        if (document.getElementById('state3')) {
            const countUp = new CountUp('state3', document.getElementById("state3").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
        if (document.getElementById('state4')) {
            const countUp = new CountUp('state4', document.getElementById("state4").getAttribute("countTo"));
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        }
    </script>
@endpush
