@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Product List'])
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
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header pb-0">
                        <div class="d-lg-flex">
                            <div>
                                <h5 class="mb-0">All Products</h5>
                                <p class="text-sm mb-0">
                                    A lightweight, extendable, dependency-free javascript HTML table plugin.
                                </p>
                            </div>
                            <div class="ms-auto my-auto mt-lg-0 mt-4">
                                <div class="ms-auto my-auto">
                                    <a href="./new-product.html" class="btn bg-gradient-primary btn-sm mb-0"
                                        target="_blank">+&nbsp; New Product</a>
                                    <button type="button" class="btn btn-outline-primary btn-sm mb-0" data-bs-toggle="modal"
                                        data-bs-target="#import">
                                        Import
                                    </button>
                                    <div class="modal fade" id="import" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog mt-lg-10">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="ModalLabel">Import CSV</h5>
                                                    <i class="fas fa-upload ms-3"></i>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>You can browse your computer for a file.</p>
                                                    <input type="text" placeholder="Browse file..."
                                                        class="form-control mb-3">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="importCheck" checked="">
                                                        <label class="custom-control-label" for="importCheck">I accept the
                                                            terms and conditions</label>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn bg-gradient-secondary btn-sm"
                                                        data-bs-dismiss="modal">Close</button>
                                                    <button type="button"
                                                        class="btn bg-gradient-primary btn-sm">Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-outline-primary btn-sm export mb-0 mt-sm-0 mt-1" data-type="csv"
                                        type="button" name="button">Export</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-0">
                        <div class="table-responsive">
                            <table class="table table-flush" id="products-list">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>SKU</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck1"
                                                        checked>
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/adidas-hoodie.jpg"
                                                    alt="hoodie">
                                                <h6 class="ms-3 my-auto">BKLGO Full Zip Hoodie</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Clothing</td>
                                        <td class="text-sm">$1,321</td>
                                        <td class="text-sm">243598234</td>
                                        <td class="text-sm">0</td>
                                        <td>
                                            <span class="badge badge-danger badge-sm">Out of Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck2"
                                                        checked>
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/macbook-pro.jpg"
                                                    alt="mac">
                                                <h6 class="ms-3 my-auto">MacBook Pro</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Electronics</td>
                                        <td class="text-sm">$1,869</td>
                                        <td class="text-sm">877712</td>
                                        <td class="text-sm">0</td>
                                        <td>
                                            <span class="badge badge-danger badge-sm">Out of Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck3">
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/metro-chair.jpg"
                                                    alt="metro-chair">
                                                <h6 class="ms-3 my-auto">Metro Bar Stool</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Furniture</td>
                                        <td class="text-sm">$99</td>
                                        <td class="text-sm">0134729</td>
                                        <td class="text-sm">978</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">in Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck10">
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/alchimia-chair.jpg"
                                                    alt="alchimia">
                                                <h6 class="ms-3 my-auto">Alchimia Chair</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Furniture</td>
                                        <td class="text-sm">$2,999</td>
                                        <td class="text-sm">113213</td>
                                        <td class="text-sm">0</td>
                                        <td>
                                            <span class="badge badge-danger badge-sm">Out of Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck5">
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/fendi-coat.jpg"
                                                    alt="fendi">
                                                <h6 class="ms-3 my-auto">Fendi Gradient Coat</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Clothing</td>
                                        <td class="text-sm">$869</td>
                                        <td class="text-sm">634729</td>
                                        <td class="text-sm">725</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">in Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck6">
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/off-white-jacket.jpg"
                                                    alt="off_white">
                                                <h6 class="ms-3 my-auto">Off White Cotton Bomber</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Clothing</td>
                                        <td class="text-sm">$1,869</td>
                                        <td class="text-sm">634729</td>
                                        <td class="text-sm">725</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">in Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck7"
                                                        checked>
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yohji-yamamoto.jpg"
                                                    alt="yohji">
                                                <h6 class="ms-3 my-auto">Y-3 Yohji Yamamoto</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Shoes</td>
                                        <td class="text-sm">$869</td>
                                        <td class="text-sm">634729</td>
                                        <td class="text-sm">725</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">In Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck9"
                                                        checked>
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/mcqueen-shirt.jpg"
                                                    alt="mcqueen">
                                                <h6 class="ms-3 my-auto">Alexander McQueen</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Clothing</td>
                                        <td class="text-sm">$1,199</td>
                                        <td class="text-sm">00121399</td>
                                        <td class="text-sm">51293</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">in Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck11"
                                                        checked>
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yellow-chair.jpg"
                                                    alt="coco">
                                                <h6 class="ms-3 my-auto">Luin Floor Lamp</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Furniture</td>
                                        <td class="text-sm">$1,900</td>
                                        <td class="text-sm">434729</td>
                                        <td class="text-sm">1100191321</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">In Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck12">
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/heron-tshirt.jpg"
                                                    alt="heron">
                                                <h6 class="ms-3 my-auto">Heron Preston T-shirt</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Clothing</td>
                                        <td class="text-sm">$149</td>
                                        <td class="text-sm">928341</td>
                                        <td class="text-sm">0</td>
                                        <td>
                                            <span class="badge badge-danger badge-sm">Out of Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck13"
                                                        checked>
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/living-chair.jpg"
                                                    alt="coco">
                                                <h6 class="ms-3 my-auto">Gray Living Chair</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Furniture</td>
                                        <td class="text-sm">$2,099</td>
                                        <td class="text-sm">9912834</td>
                                        <td class="text-sm">32</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">in Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck4">
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/orange-sofa.jpg"
                                                    alt="yohji">
                                                <h6 class="ms-3 my-auto">Derbyshire Orange Sofa</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Furniture</td>
                                        <td class="text-sm">$2,999</td>
                                        <td class="text-sm">561151</td>
                                        <td class="text-sm">22</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">in Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck8"
                                                        checked>
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/burberry.jpg"
                                                    alt="undercover">
                                                <h6 class="ms-3 my-auto">Burberry Low-Tops</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Shoes</td>
                                        <td class="text-sm">$869</td>
                                        <td class="text-sm">634729</td>
                                        <td class="text-sm">725</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">in Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck22">
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/d&g-skirt.jpg"
                                                    alt="D&G">
                                                <h6 class="ms-3 my-auto">Dolce & Gabbana Skirt</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Designer</td>
                                        <td class="text-sm">$999</td>
                                        <td class="text-sm">01827391</td>
                                        <td class="text-sm">0</td>
                                        <td>
                                            <span class="badge badge-danger badge-sm">Out of Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex">
                                                <div class="form-check my-auto">
                                                    <input class="form-check-input" type="checkbox" id="customCheck23"
                                                        checked>
                                                </div>
                                                <img class="w-10 ms-3"
                                                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/undercover.jpg"
                                                    alt="undercover">
                                                <h6 class="ms-3 my-auto">Undercover T-shirt</h6>
                                            </div>
                                        </td>
                                        <td class="text-sm">Shoes</td>
                                        <td class="text-sm">$869</td>
                                        <td class="text-sm">634729</td>
                                        <td class="text-sm">725</td>
                                        <td>
                                            <span class="badge badge-success badge-sm">in Stock</span>
                                        </td>
                                        <td class="text-sm">
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Preview product">
                                                <i class="fas fa-eye text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip"
                                                data-bs-original-title="Edit product">
                                                <i class="fas fa-user-edit text-secondary"></i>
                                            </a>
                                            <a href="javascript:;" data-bs-toggle="tooltip"
                                                data-bs-original-title="Delete product">
                                                <i class="fas fa-trash text-secondary"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>SKU</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
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
    <script src="../../../assets/js/plugins/datatables.js"></script>
    <script>
        if (document.getElementById('products-list')) {
            const dataTableSearch = new simpleDatatables.DataTable("#products-list", {
                searchable: true,
                fixedHeight: false,
                perPage: 7
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
        };
    </script>
@endpush
