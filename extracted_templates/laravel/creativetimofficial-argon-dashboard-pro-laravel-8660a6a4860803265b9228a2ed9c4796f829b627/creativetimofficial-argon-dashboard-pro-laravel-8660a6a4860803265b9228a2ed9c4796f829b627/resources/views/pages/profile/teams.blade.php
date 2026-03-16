@extends('layouts.app')

@section('content')
    <div class="main-content position-relative max-height-vh-100 h-100">
        <!-- Navbar -->
        <nav
            class="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2 mt-n11">
            <div class="container-fluid py-1">
                @include('layouts.navbars.auth.topnav', ['title' => 'Teams'])
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
                                    <a class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center  active "
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
            <div class="row">
                <div class="col-12">
                    <div class="card overflow-scroll">
                        <div class="card-body d-flex">
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg border-1 rounded-circle bg-gradient-primary">
                                    <i class="fas fa-plus text-white"></i>
                                </a>
                                <p class="mb-0 text-sm" style="margin-top:6px;">Add story</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-primary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/team-1.jpg">
                                </a>
                                <p class="mb-0 text-sm">Abbie W</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-primary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/team-2.jpg">
                                </a>
                                <p class="mb-0 text-sm">Boris U</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-primary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/team-3.jpg">
                                </a>
                                <p class="mb-0 text-sm">Kay R</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-primary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/team-4.jpg">
                                </a>
                                <p class="mb-0 text-sm">Tom M</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-primary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/team-5.jpg">
                                </a>
                                <p class="mb-0 text-sm">Nicole N</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-primary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/marie.jpg">
                                </a>
                                <p class="mb-0 text-sm">Marie P</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-primary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/bruce-mars.jpg">
                                </a>
                                <p class="mb-0 text-sm">Bruce M</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-secondary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/ivana-squares.jpg">
                                </a>
                                <p class="mb-0 text-sm">Sandra A</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-secondary">
                                    <img alt="Image placeholder" class="p-1"
                                        src="/assets/img/kal-visuals-square.jpg">
                                </a>
                                <p class="mb-0 text-sm">Katty L</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-secondary">
                                    <img alt="Image placeholder" class="p-1" src="/assets/img/ivana-square.jpg">
                                </a>
                                <p class="mb-0 text-sm">Emma O</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-3 col-4 text-center">
                                <a href="javascript:;" class="avatar avatar-lg rounded-circle border border-secondary">
                                    <img alt="Image placeholder" class="p-1"
                                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/team-9.jpg">
                                </a>
                                <p class="mb-0 text-sm">Tao G</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 col-lg-6">
                    <div class="card h-100">
                        <div class="card-header d-flex align-items-center border-bottom py-3">
                            <div class="d-flex align-items-center">
                                <a href="javascript:;">
                                    <img src="/assets/img/team-4.jpg" class="avatar" alt="profile-image">
                                </a>
                                <div class="mx-3">
                                    <a href="javascript:;" class="text-dark font-weight-600 text-sm">John Snow</a>
                                    <small class="d-block text-muted">3 days ago</small>
                                </div>
                            </div>
                            <div class="text-end ms-auto">
                                <button type="button" class="btn btn-xs btn-primary mb-0">
                                    <i class="fas fa-plus pe-2"></i> Follow
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="mb-4">
                                Personal profiles are the perfect way for you to grab their attention and persuade
                                recruiters to continue reading your CV because you’re telling them from the off exactly why
                                they should hire you.
                            </p>
                            <img alt="Image placeholder"
                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/activity-feed.jpg"
                                class="img-fluid border-radius-lg shadow-lg max-height-500">
                            <div class="row align-items-center px-2 mt-4 mb-2">
                                <div class="col-sm-6">
                                    <div class="d-flex">
                                        <div class="d-flex align-items-center">
                                            <i class="ni ni-like-2 me-1 cursor-pointer opacity-6"></i>
                                            <span class="text-sm me-3 ">150</span>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="ni ni-chat-round me-1 cursor-pointer opacity-6"></i>
                                            <span class="text-sm me-3">36</span>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="ni ni-curved-next me-1 cursor-pointer opacity-6"></i>
                                            <span class="text-sm me-2">12</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 d-none d-sm-block">
                                    <div class="d-flex align-items-center justify-content-sm-end">
                                        <div class="d-flex align-items-center">
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-toggle="tooltip" data-original-title="Jessica Rowland">
                                                <img alt="Image placeholder" src="/assets/img/team-5.jpg"
                                                    class="">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-toggle="tooltip" data-original-title="Audrey Love">
                                                <img alt="Image placeholder" src="/assets/img/team-2.jpg"
                                                    class="rounded-circle">
                                            </a>
                                            <a href="javascript:;" class="avatar avatar-xs rounded-circle"
                                                data-toggle="tooltip" data-original-title="Michael Lewis">
                                                <img alt="Image placeholder" src="/assets/img/team-1.jpg"
                                                    class="rounded-circle">
                                            </a>
                                        </div>
                                        <small class="ps-2 font-weight-bold">and 30+ more</small>
                                    </div>
                                </div>
                                <hr class="horizontal dark my-3">
                            </div>
                            <!-- Comments -->
                            <div class="mb-1">
                                <div class="d-flex">
                                    <div class="flex-shrink-0">
                                        <img alt="Image placeholder" class="avatar rounded-circle"
                                            src="/assets/img/bruce-mars.jpg">
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h6 class="h5 mt-0">Michael Lewis</h6>
                                        <p class="text-sm">I always felt like I could do anything. That’s the main
                                            thing people are controlled by! Thoughts- their perception of themselves!</p>
                                        <div class="d-flex">
                                            <div>
                                                <i class="ni ni-like-2 me-1 cursor-pointer opacity-6"></i>
                                            </div>
                                            <span class="text-sm me-2">3 likes</span>
                                            <div>
                                                <i class="ni ni-curved-next me-1 cursor-pointer opacity-6"></i>
                                            </div>
                                            <span class="text-sm me-2">2 shares</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex mt-3">
                                    <div class="flex-shrink-0">
                                        <img alt="Image placeholder" class="avatar rounded-circle"
                                            src="/assets/img/team-5.jpg">
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h6 class="h5 mt-0">Jessica Stones</h6>
                                        <p class="text-sm">Society has put up so many boundaries, so many
                                            limitations on what’s right and wrong that it’s almost impossible to get a pure
                                            thought out. It’s like a little kid, a little boy.</p>
                                        <div class="d-flex">
                                            <div>
                                                <i class="ni ni-like-2 me-1 cursor-pointer opacity-6"></i>
                                            </div>
                                            <span class="text-sm me-2">10 likes</span>
                                            <div>
                                                <i class="ni ni-curved-next me-1 cursor-pointer opacity-6"></i>
                                            </div>
                                            <span class="text-sm me-2">1 share</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex mt-4">
                                    <div class="flex-shrink-0">
                                        <img alt="Image placeholder" class="avatar rounded-circle me-3"
                                            src="/assets/img/team-4.jpg">
                                    </div>
                                    <div class="flex-grow-1 my-auto">
                                        <form>
                                            <textarea class="form-control" placeholder="Write your comment" rows="1"></textarea>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="card mb-3 mt-lg-0 mt-4">
                        <div class="card-body pb-0">
                            <div class="row align-items-center mb-3">
                                <div class="col-9">
                                    <h5 class="mb-1">
                                        <a href="javascript:;">Digital Marketing</a>
                                    </h5>
                                </div>
                                <div class="col-3 text-end">
                                    <div class="dropstart">
                                        <a href="javascript:;" class="text-secondary" id="dropdownMarketingCard"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-lg-start px-2 py-3"
                                            aria-labelledby="dropdownMarketingCard">
                                            <li><a class="dropdown-item border-radius-md" href="javascript:;">Edit Team</a>
                                            </li>
                                            <li><a class="dropdown-item border-radius-md" href="javascript:;">Add
                                                    Member</a></li>
                                            <li><a class="dropdown-item border-radius-md" href="javascript:;">See
                                                    Details</a></li>
                                            <li>
                                                <hr class="dropdown-divider">
                                            </li>
                                            <li><a class="dropdown-item border-radius-md text-danger"
                                                    href="javascript:;">Remove Team</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p>A group of people who collectively are responsible for all of the work necessary to produce
                                working, validated assets.</p>
                            <ul class="list-unstyled mx-auto">
                                <li class="d-flex">
                                    <p class="mb-0">Industry:</p>
                                    <span class="badge badge-secondary ms-auto">Marketing Team</span>
                                </li>
                                <li>
                                    <hr class="horizontal dark">
                                </li>
                                <li class="d-flex">
                                    <p class="mb-0">Rating:</p>
                                    <div class="rating ms-auto">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </li>
                                <li>
                                    <hr class="horizontal dark">
                                </li>
                                <li class="d-flex">
                                    <p class="mb-0">Members:</p>
                                    <div class="avatar-group ms-auto">
                                        <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexa Tompson">
                                            <img alt="Image placeholder" src="/assets/img/team-1.jpg">
                                        </a>
                                        <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                            <img alt="Image placeholder" src="/assets/img/team-2.jpg">
                                        </a>
                                        <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                            <img alt="Image placeholder" src="/assets/img/team-3.jpg">
                                        </a>
                                        <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Martin Doe">
                                            <img alt="Image placeholder" src="/assets/img/team-4.jpg">
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card mt-4 mb-3">
                        <div class="card-body pb-0">
                            <div class="row align-items-center mb-3">
                                <div class="col-9">
                                    <h5 class="mb-1">
                                        <a href="javascript:;">Design</a>
                                    </h5>
                                </div>
                                <div class="col-3 text-end">
                                    <div class="dropstart">
                                        <a href="javascript:;" class="text-secondary" id="dropdownDesignCard"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-lg-start px-2 py-3"
                                            aria-labelledby="dropdownDesignCard">
                                            <li><a class="dropdown-item border-radius-md" href="javascript:;">Edit Team</a>
                                            </li>
                                            <li><a class="dropdown-item border-radius-md" href="javascript:;">Add
                                                    Member</a></li>
                                            <li><a class="dropdown-item border-radius-md" href="javascript:;">See
                                                    Details</a></li>
                                            <li>
                                                <hr class="dropdown-divider">
                                            </li>
                                            <li><a class="dropdown-item border-radius-md text-danger"
                                                    href="javascript:;">Remove Team</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p>Because it's about motivating the doers. Because I’m here to follow my dreams and inspire
                                other people to follow their dreams, too.</p>
                            <ul class="list-unstyled mx-auto">
                                <li class="d-flex">
                                    <p class="mb-0">Industry:</p>
                                    <span class="badge badge-secondary ms-auto">Design Team</span>
                                </li>
                                <li>
                                    <hr class="horizontal dark">
                                </li>
                                <li class="d-flex">
                                    <p class="mb-0">Rating:</p>
                                    <div class="rating ms-auto">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                </li>
                                <li>
                                    <hr class="horizontal dark">
                                </li>
                                <li class="d-flex">
                                    <p class="mb-0">Members:</p>
                                    <div class="avatar-group ms-auto">
                                        <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Martin Doe">
                                            <img alt="Image placeholder" src="/assets/img/team-4.jpg">
                                        </a>
                                        <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                            <img alt="Image placeholder" src="/assets/img/team-3.jpg">
                                        </a>
                                        <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexa Tompson">
                                            <img alt="Image placeholder" src="/assets/img/team-1.jpg">
                                        </a>
                                        <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexandra Smith">
                                            <img alt="Image placeholder" src="/assets/img/team-5.jpg">
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card mt-4">
                        <div class="card-body p-3">
                            <div class="d-flex">
                                <div class="avatar avatar-lg">
                                    <img alt="Image placeholder" src="/assets/img/small-logos/logo-slack.svg">
                                </div>
                                <div class="ms-2 my-auto">
                                    <h6 class="mb-0">Slack Meet</h6>
                                    <p class="text-xs mb-0">11:00 AM</p>
                                </div>
                            </div>
                            <p class="mt-3"> You have an upcoming meet for Marketing Planning</p>
                            <p class="mb-0"><b>Meeting ID:</b> 902-128-281</p>
                            <hr class="horizontal dark">
                            <div class="d-flex">
                                <button type="button" class="btn btn-sm btn-primary mb-0">
                                    Join
                                </button>
                                <div class="avatar-group ms-auto">
                                    <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexa Tompson">
                                        <img alt="Image placeholder" src="/assets/img/team-1.jpg">
                                    </a>
                                    <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                        <img alt="Image placeholder" src="/assets/img/team-2.jpg">
                                    </a>
                                    <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                        <img alt="Image placeholder" src="/assets/img/team-3.jpg">
                                    </a>
                                    <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Martin Doe">
                                        <img alt="Image placeholder" src="/assets/img/ivana-squares.jpg">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-4">
                        <div class="card-body p-3">
                            <div class="d-flex">
                                <div class="avatar avatar-lg">
                                    <img alt="Image placeholder" src="/assets/img/small-logos/logo-invision.svg">
                                </div>
                                <div class="ms-2 my-auto">
                                    <h6 class="mb-0">Invision</h6>
                                    <p class="text-xs mb-0">4:50 PM</p>
                                </div>
                            </div>
                            <p class="mt-3"> You have an upcoming video call for <span
                                    class="text-primary">Soft Design</span> at 5:00 PM.</p>
                            <p class="mb-0"><b>Meeting ID:</b> 111-968-981</p>
                            <hr class="horizontal dark">
                            <div class="d-flex">
                                <button type="button" class="btn btn-sm btn-primary mb-0">
                                    Join
                                </button>
                                <div class="avatar-group ms-auto">
                                    <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexa Tompson">
                                        <img alt="Image placeholder" src="/assets/img/team-1.jpg">
                                    </a>
                                    <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                        <img alt="Image placeholder" src="/assets/img/team-2.jpg">
                                    </a>
                                    <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                        <img alt="Image placeholder" src="/assets/img/team-3.jpg">
                                    </a>
                                    <a href="javascript:;" class="avatar avatar-lg avatar-xs rounded-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Martin Doe">
                                        <img alt="Image placeholder" src="/assets/img/ivana-squares.jpg">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @include('layouts.footers.auth.footer')
        </div>
    </div>
@endsection
