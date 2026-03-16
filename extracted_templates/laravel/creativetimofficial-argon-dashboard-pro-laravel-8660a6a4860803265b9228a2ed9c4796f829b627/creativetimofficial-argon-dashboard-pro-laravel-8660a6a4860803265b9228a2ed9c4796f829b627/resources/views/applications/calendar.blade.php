@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Calendar'])
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
        <div class="row mb-lg-7">
            <div class="col-12 ms-auto">
                <div class="d-flex mb-4">
                    <div class="pe-4 mt-1 position-relative ms-auto">
                        <p class="text-white text-xs font-weight-bold mb-2">Team members:</p>
                        <div class="d-flex align-items-center justify-content-center">
                            <div class="avatar-group">
                                <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-bs-toggle="tooltip"
                                    title="Jessica Rowland">
                                    <img alt="Image placeholder" src="../../assets/img/team-1.jpg" class="">
                                </a>
                                <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-bs-toggle="tooltip"
                                    title="Audrey Love">
                                    <img alt="Image placeholder" src="../../assets/img/team-2.jpg" class="rounded-circle">
                                </a>
                                <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-bs-toggle="tooltip"
                                    title="Michael Lewis">
                                    <img alt="Image placeholder" src="../../assets/img/team-3.jpg" class="rounded-circle">
                                </a>
                                <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-bs-toggle="tooltip"
                                    title="Lucia Linda">
                                    <img alt="Image placeholder" src="../../assets/img/team-4.jpg" class="rounded-circle">
                                </a>
                                <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-bs-toggle="tooltip"
                                    title="Ronald Miller">
                                    <img alt="Image placeholder" src="../../assets/img/team-5.jpg" class="rounded-circle">
                                </a>
                            </div>
                        </div>
                        <hr class="vertical light mt-0">
                    </div>
                    <div class="ps-4">
                        <button class="btn btn-outline-white btn-icon-only mb-0 mt-3 py-0" data-bs-toggle="modal"
                            data-target="#new-board-modal">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-xl-9">
                <div class="card card-calendar">
                    <div class="card-body p-3">
                        <div class="calendar" data-bs-toggle="calendar" id="calendar"></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3">
                <div class="row">
                    <div class="col-xl-12 col-md-6 mt-xl-0 mt-4">
                        <div class="card">
                            <div class="card-header p-3 pb-0">
                                <h6 class="mb-0">Next events</h6>
                            </div>
                            <div class="card-body border-radius-lg p-3">
                                <div class="d-flex">
                                    <div>
                                        <div
                                            class="icon icon-shape bg-danger-soft shadow text-center border-radius-md shadow-none">
                                            <i class="ni ni-money-coins text-lg text-danger text-gradient opacity-10"
                                                aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="ms-3">
                                        <div class="numbers">
                                            <h6 class="mb-1 text-dark text-sm">Cyber Week</h6>
                                            <span class="text-sm">27 March 2021, at 12:30 PM</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex mt-4">
                                    <div>
                                        <div
                                            class="icon icon-shape bg-primary-soft shadow text-center border-radius-md shadow-none">
                                            <i class="ni ni-bell-55 text-lg text-primary text-gradient opacity-10"
                                                aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="ms-3">
                                        <div class="numbers">
                                            <h6 class="mb-1 text-dark text-sm">Meeting with Marry</h6>
                                            <span class="text-sm">24 March 2021, at 10:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex mt-4">
                                    <div>
                                        <div
                                            class="icon icon-shape bg-success-soft shadow text-center border-radius-md shadow-none">
                                            <i class="ni ni-books text-lg text-success text-gradient opacity-10"
                                                aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="ms-3">
                                        <div class="numbers">
                                            <h6 class="mb-1 text-dark text-sm">Book Deposit Hall</h6>
                                            <span class="text-sm">25 March 2021, at 9:30 AM</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex mt-4">
                                    <div>
                                        <div
                                            class="icon icon-shape bg-warning-soft shadow text-center border-radius-md shadow-none">
                                            <i class="ni ni-delivery-fast text-lg text-warning text-gradient opacity-10"
                                                aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="ms-3">
                                        <div class="numbers">
                                            <h6 class="mb-1 text-dark text-sm">Shipment Deal UK</h6>
                                            <span class="text-sm">25 March 2021, at 2:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex mt-4">
                                    <div>
                                        <div
                                            class="icon icon-shape bg-info-soft shadow text-center border-radius-md shadow-none">
                                            <i class="ni ni-palette text-lg text-info text-gradient opacity-10"
                                                aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="ms-3">
                                        <div class="numbers">
                                            <h6 class="mb-1 text-dark text-sm">Verify Dashboard Color Palette</h6>
                                            <span class="text-sm">26 March 2021, at 9:00 AM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12 col-md-6 mt-4">
                        <div class="card bg-gradient-dark">
                            <div class="card-header bg-transparent p-3 pb-0">
                                <div class="row">
                                    <div class="col-7">
                                        <h6 class="text-white mb-0">Productivity</h6>
                                        <p class="text-sm text-white">
                                            <i class="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                            <span class="font-weight-bold">4% more</span> in 2021
                                        </p>
                                    </div>
                                    <div class="col-5 text-end">
                                        <div class="dropdown me-3">
                                            <a class="cursor-pointer" href="javascript:;" id="dropdownTable"
                                                data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                                <i class="fa fa-ellipsis-h text-white" aria-hidden="true"></i>
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-end ms-n5 px-2 py-3"
                                                aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                                                <li><a class="dropdown-item border-radius-md"
                                                        href="javascript:;">Action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Another
                                                        action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Something
                                                        else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div class="chart">
                                    <canvas id="chart-line-1" class="chart-canvas" height="100"></canvas>
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
    <script src="../../assets/js/plugins/fullcalendar.min.js"></script>
    <script src="../../assets/js/plugins/chartjs.min.js"></script>
    <script>
        var calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
            contentHeight: 'auto',
            initialView: "dayGridMonth",
            headerToolbar: {
                start: 'title', // will normally be on the left. if RTL, will be on the right
                center: '',
                end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
            },
            selectable: true,
            editable: true,
            initialDate: '2021-12-01',
            events: [{
                    title: 'Call with Dave',
                    start: '2021-11-18',
                    end: '2021-11-18',
                    className: 'bg-gradient-danger'
                },

                {
                    title: 'Lunch meeting',
                    start: '2021-11-21',
                    end: '2021-11-22',
                    className: 'bg-gradient-warning'
                },

                {
                    title: 'All day conference',
                    start: '2021-11-29',
                    end: '2021-11-29',
                    className: 'bg-gradient-success'
                },

                {
                    title: 'Meeting with Mary',
                    start: '2021-12-01',
                    end: '2021-12-01',
                    className: 'bg-gradient-info'
                },

                {
                    title: 'Winter Hackaton',
                    start: '2021-12-03',
                    end: '2021-12-03',
                    className: 'bg-gradient-danger'
                },

                {
                    title: 'Digital event',
                    start: '2021-12-07',
                    end: '2021-12-09',
                    className: 'bg-gradient-warning'
                },

                {
                    title: 'Marketing event',
                    start: '2021-12-10',
                    end: '2021-12-10',
                    className: 'bg-gradient-primary'
                },

                {
                    title: 'Dinner with Family',
                    start: '2021-12-19',
                    end: '2021-12-19',
                    className: 'bg-gradient-danger'
                },

                {
                    title: 'Black Friday',
                    start: '2021-12-23',
                    end: '2021-12-23',
                    className: 'bg-gradient-info'
                },

                {
                    title: 'Cyber Week',
                    start: '2021-12-02',
                    end: '2021-12-02',
                    className: 'bg-gradient-warning'
                },

            ],
            views: {
                month: {
                    titleFormat: {
                        month: "long",
                        year: "numeric"
                    }
                },
                agendaWeek: {
                    titleFormat: {
                        month: "long",
                        year: "numeric",
                        day: "numeric"
                    }
                },
                agendaDay: {
                    titleFormat: {
                        month: "short",
                        year: "numeric",
                        day: "numeric"
                    }
                }
            },
        });

        calendar.render();

        var ctx1 = document.getElementById("chart-line-1").getContext("2d");

        var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(255,255,255,0.3)');
        gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
        gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

        new Chart(ctx1, {
            type: "line",
            data: {
                labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Visitors",
                    tension: 0.5,
                    borderWidth: 0,
                    pointRadius: 0,
                    borderColor: "#fff",
                    borderWidth: 2,
                    backgroundColor: gradientStroke1,
                    data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
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
                            display: false
                        }
                    },
                },
            },
        });
    </script>
@endpush
