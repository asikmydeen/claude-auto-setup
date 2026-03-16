@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Edit Product'])
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
        <div class="row">
            <div class="col-lg-6">
                <h4 class="text-white">Make the changes below</h4>
                <p class="text-white opacity-8">We’re constantly trying to express ourselves and actualize our dreams. If
                    you have the opportunity to play.</p>
            </div>
            <div class="col-lg-6 text-right d-flex flex-column justify-content-center">
                <button type="button"
                    class="btn btn-outline-white mb-0 ms-lg-auto me-lg-0 me-auto mt-lg-0 mt-2">Save</button>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="font-weight-bolder">Product Image</h5>
                        <div class="row">
                            <div class="col-12">
                                <img class="w-100 border-radius-lg shadow-lg mt-3"
                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-page.jpg"
                                    alt="product_image">
                            </div>
                            <div class="col-12 mt-5">
                                <div class="d-flex">
                                    <button class="btn btn-primary btn-sm mb-0 me-2" type="button"
                                        name="button">Edit</button>
                                    <button class="btn btn-outline-dark btn-sm mb-0" type="button"
                                        name="button">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 mt-lg-0 mt-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="font-weight-bolder">Product Information</h5>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label>Name</label>
                                <input class="form-control" type="text" value="Minimal Bar Stool" />
                            </div>
                            <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                                <label>Weight</label>
                                <input class="form-control" type="number" value="2" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <label class="mt-4">Collection</label>
                                <input class="form-control" type="text" value="Summer" />
                            </div>
                            <div class="col-3">
                                <label class="mt-4">Price</label>
                                <input class="form-control" type="text" value="$90" />
                            </div>
                            <div class="col-3">
                                <label class="mt-4">Quantity</label>
                                <input class="form-control" type="number" value="50" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label class="mt-4">Description</label>
                                <p class="form-text text-muted text-xs ms-1 d-inline">
                                    (optional)
                                </p>
                                <div id="edit-deschiption-edit" class="h-50">
                                    Long sleeves black denim jacket with a twisted design. Contrast stitching. Button up
                                    closure. White arrow prints on the back.
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label class="mt-4">Category</label>
                                <select class="form-control" name="choices-category" id="choices-category-edit">
                                    <option value="Choice 1" selected="">Furniture</option>
                                    <option value="Choice 2">Real Estate</option>
                                    <option value="Choice 3">Electronics</option>
                                    <option value="Choice 4">Clothing</option>
                                    <option value="Choice 5">Others</option>
                                </select>
                                <label>Color</label>
                                <select class="form-control" name="choices-color" id="choices-color-edit">
                                    <option value="Choice 1" selected="">Black</option>
                                    <option value="Choice 2">White</option>
                                    <option value="Choice 3">Blue</option>
                                    <option value="Choice 4">Orange</option>
                                    <option value="Choice 5">Green</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="font-weight-bolder">Socials</h5>
                        <label>Shoppify Handle</label>
                        <input class="form-control" type="text" value="@argon" />
                        <label class="mt-4">Facebook Account</label>
                        <input class="form-control" type="text" value="https://" />
                        <label class="mt-4">Instagram Account</label>
                        <input class="form-control" type="text" value="https://" />
                    </div>
                </div>
            </div>
            <div class="col-sm-8 mt-sm-0 mt-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <h5 class="font-weight-bolder">Pricing</h5>
                            <div class="col-3">
                                <label>Price</label>
                                <input class="form-control" type="number" value="99.00" />
                            </div>
                            <div class="col-4">
                                <label>Currency</label>
                                <select class="form-control" name="choices-sizes" id="choices-currency-edit">
                                    <option value="Choice 1" selected="">USD</option>
                                    <option value="Choice 2">EUR</option>
                                    <option value="Choice 3">GBP</option>
                                    <option value="Choice 4">CNY</option>
                                    <option value="Choice 5">INR</option>
                                    <option value="Choice 6">BTC</option>
                                </select>
                            </div>
                            <div class="col-5">
                                <label>SKU</label>
                                <input class="form-control" type="text" value="71283476591" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <label class="mt-4">Tags</label>
                                <select class="form-control" name="choices-tags" id="choices-tags-edit" multiple>
                                    <option value="Choice 1" selected>In Stock</option>
                                    <option value="Choice 2">Out of Stock</option>
                                    <option value="Choice 3">Sale</option>
                                    <option value="Choice 4">Black Friday</option>
                                </select>
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
    <script src="../../../assets/js/plugins/choices.min.js"></script>
    <script src="../../../assets/js/plugins/quill.min.js"></script>
    <script>
        if (document.getElementById('edit-deschiption-edit')) {
            var quill = new Quill('#edit-deschiption-edit', {
                theme: 'snow' // Specify theme in configuration
            });
        };

        if (document.getElementById('choices-category-edit')) {
            var element = document.getElementById('choices-category-edit');
            const example = new Choices(element, {
                searchEnabled: false
            });
        };

        if (document.getElementById('choices-color-edit')) {
            var element = document.getElementById('choices-color-edit');
            const example = new Choices(element, {
                searchEnabled: false
            });
        };

        if (document.getElementById('choices-currency-edit')) {
            var element = document.getElementById('choices-currency-edit');
            const example = new Choices(element, {
                searchEnabled: false
            });
        };

        if (document.getElementById('choices-tags-edit')) {
            var tags = document.getElementById('choices-tags-edit');
            const examples = new Choices(tags, {
                removeItemButton: true
            });

            examples.setChoices(
                [{
                        value: 'One',
                        label: 'Expired',
                        disabled: true
                    },
                    {
                        value: 'Two',
                        label: 'Out of Stock',
                        selected: true
                    }
                ],
                'value',
                'label',
                false,
            );
        }
    </script>
@endpush
