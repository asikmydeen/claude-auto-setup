<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-2
    {{ $bg ?? ''}} {{ $box ?? ''}}"
    id="sidenav-main">
    <div class="sidenav-header">
        <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true" id="iconSidenav"></i>
        <a class="navbar-brand m-0"
            href="{{ route('dashboards', ['page' => 'default']) }}">
            <img src="{{ $logo ?? '/assets/img/logo-ct-dark.png'}}" class="navbar-brand-img h-100" alt="main_logo">
            <span class="ms-1 font-weight-bold">Argon Dashboard 2 PRO Laravel</span>
        </a>
    </div>
    <hr class="horizontal dark mt-0">
    <div class="collapse navbar-collapse  w-auto h-auto" id="sidenav-collapse-main">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a data-bs-toggle="collapse" href="#dashboardsExamples" class="nav-link {{ Route::currentRouteName() == 'dashboards' ? 'active' : '' }}"
                    aria-controls="dashboardsExamples" role="button" aria-expanded="false">
                    <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                        <i class="ni ni-shop text-primary text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Dashboards</span>
                </a>
                <div class="collapse {{ Route::currentRouteName() == 'dashboards' ? 'show' : '' }} " id="dashboardsExamples">
                    <ul class="nav ms-4">
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'landing') == true ? 'active' : '' }}" href="{{ route('dashboards', ['page' => 'landing']) }}">
                                <span class="sidenav-mini-icon"> L </span>
                                <span class="sidenav-normal"> Landing </span>
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link {{ str_contains(request()->url(), 'default') == true ? 'active' : '' }}" href="{{ route('dashboards', ['page' => 'default']) }}">
                                <span class="sidenav-mini-icon"> D </span>
                                <span class="sidenav-normal"> Default </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'automotive') == true ? 'active' : '' }}" href="{{ route('dashboards', ['page' => 'automotive']) }}">
                                <span class="sidenav-mini-icon"> A </span>
                                <span class="sidenav-normal"> Automotive </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'smart-home') == true ? 'active' : '' }}" href="{{ route('dashboards', ['page' => 'smart-home']) }}">
                                <span class="sidenav-mini-icon"> S </span>
                                <span class="sidenav-normal"> Smart Home </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link " data-bs-toggle="collapse" aria-expanded="false"
                                href="#vrExamples">
                                <span class="sidenav-mini-icon"> V </span>
                                <span class="sidenav-normal"> Virtual Reality <b class="caret"></b></span>
                            </a>
                            <div class="collapse " id="vrExamples">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'vr-default') == true ? 'active' : '' }}" href="{{ route('dashboards', ['page' => 'vr-default']) }}">
                                            <span class="sidenav-mini-icon text-xs"> V </span>
                                            <span class="sidenav-normal"> VR Default </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link{{ str_contains(request()->url(), 'vr-info') == true ? 'active' : '' }}" href="{{ route('dashboards', ['page' => 'vr-info']) }}">
                                            <span class="sidenav-mini-icon text-xs"> V </span>
                                            <span class="sidenav-normal"> VR Info </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'crm') == true ? 'active' : '' }}" href="{{ route('dashboards', ['page' => 'crm']) }}">
                                <span class="sidenav-mini-icon"> C </span>
                                <span class="sidenav-normal"> CRM </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="nav-item">
                <a data-bs-toggle="collapse" href="#laravelExamples" class="nav-link active"
                    aria-controls="laravelExamples" role="button" aria-expanded="false">
                    <div class="icon icon-shape icon-sm text-center d-flex align-items-end justify-content-center">
                        <i class="fab fa-laravel" style="color: #f4645f; font-size: large; font-weight: 500 "></i>
                    </div>
                    <span class="nav-link-text ms-1">Laravel Examples </span>
                </a>
                <div class="collapse show" id="laravelExamples">
                    <ul class="nav ms-4">
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'user-profile' ? 'active' : '' }}" href="{{ route('user-profile') }}">
                                <span class="sidenav-mini-icon"> U </span>
                                <span class="sidenav-normal"> User Profile </span>
                            </a>
                        </li>
                        @can('manage-users', auth()->user())
                            <li class="nav-item ">
                                <a class="nav-link {{ Route::currentRouteName() == 'user-management' ? 'active' : '' }}" href="{{ route('user-management') }}">
                                    <span class="sidenav-mini-icon"> U </span>
                                    <span class="sidenav-normal"> User Management </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link {{ Route::currentRouteName() == 'role-management' ? 'active' : '' }}" href="{{ route('role-management') }}">
                                    <span class="sidenav-mini-icon"> R </span>
                                    <span class="sidenav-normal"> Role Management </span>
                                </a>
                            </li>
                        @endcan
                        @can('manage-items', auth()->user())
                            <li class="nav-item ">
                                <a class="nav-link {{ Route::currentRouteName() == 'category-management' ? 'active' : '' }}" href="{{ route('category-management') }}">
                                    <span class="sidenav-mini-icon"> C </span>
                                    <span class="sidenav-normal"> Category Management </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link {{ Route::currentRouteName() == 'tag-management' ? 'active' : '' }}" href="{{ route('tag-management') }}">
                                    <span class="sidenav-mini-icon"> T </span>
                                    <span class="sidenav-normal"> Tag Management </span>
                                </a>
                            </li>
                        @endcan
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'item-management' ? 'active' : '' }}" href="{{ route('item-management') }}">
                                <span class="sidenav-mini-icon"> I </span>
                                <span class="sidenav-normal"> Items Management </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="nav-item mt-3">
                <h6 class="ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6">PAGES</h6>
            </li>
            <li class="nav-item">
                <a data-bs-toggle="collapse" href="#pagesExamples" class="nav-link {{ str_contains(request()->url(), 'pages') == true ? 'active' : '' }}"
                    aria-controls="pagesExamples" role="button" aria-expanded="false">
                    <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                        <i class="ni ni-ungroup text-warning text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Pages</span>
                </a>
                <div class="collapse {{ str_contains(request()->url(), 'pages') == true ? 'show' : '' }}" id="pagesExamples">
                    <ul class="nav ms-4">
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'profile') == true ? 'active' : '' }}"
                                aria-controls="profileExample" data-bs-toggle="collapse" aria-expanded="false" role="button"
                                href="#profileExample">
                                <span class="sidenav-mini-icon"> P </span>
                                <span class="sidenav-normal"> Profile <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{  Route::currentRouteName() == 'profiles' ? 'show' : '' }}" id="profileExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'overview') == true ? 'active' : '' }}" href="{{ route('profiles', ['page' => 'overview']) }}">
                                            <span class="sidenav-mini-icon text-xs"> P </span>
                                            <span class="sidenav-normal"> Profile Overview </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'teams') == true ? 'active' : '' }}" href="{{ route('profiles', ['page' => 'teams']) }}">
                                            <span class="sidenav-mini-icon text-xs"> T </span>
                                            <span class="sidenav-normal"> Teams </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'projects') == true ? 'active' : '' }}" href="{{ route('profiles', ['page' => 'projects']) }}">
                                            <span class="sidenav-mini-icon text-xs"> A </span>
                                            <span class="sidenav-normal"> All Projects </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ Route::currentRouteName() == 'users' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false" role="button"
                                href="#usersExample">
                                <span class="sidenav-mini-icon"> U </span>
                                <span class="sidenav-normal"> Users <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{  Route::currentRouteName() == 'users' ? 'show' : '' }}" id="usersExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'reports') == true ? 'active' : '' }}" href="{{ route('users', ['page' => 'reports']) }}">
                                            <span class="sidenav-mini-icon text-xs"> R </span>
                                            <span class="sidenav-normal"> Reports </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'new-user') == true ? 'active' : '' }}" href="{{ route('users', ['page' => 'new-user']) }}">
                                            <span class="sidenav-mini-icon text-xs"> N </span>
                                            <span class="sidenav-normal"> New User </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'accounts' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#accountExample">
                                <span class="sidenav-mini-icon"> A </span>
                                <span class="sidenav-normal"> Account <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'accounts' ? 'show' : '' }}" id="accountExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'settings') == true ? 'active' : '' }}" href="{{ route('accounts', ['page' => 'settings']) }}">
                                            <span class="sidenav-mini-icon text-xs"> S </span>
                                            <span class="sidenav-normal"> Settings </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'billing') == true ? 'active' : '' }}" href="{{ route('accounts', ['page' => 'billing']) }}">
                                            <span class="sidenav-mini-icon text-xs"> B </span>
                                            <span class="sidenav-normal"> Billing </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'invoice') == true ? 'active' : '' }}" href="{{ route('accounts', ['page' => 'invoice']) }}">
                                            <span class="sidenav-mini-icon text-xs"> I </span>
                                            <span class="sidenav-normal"> Invoice </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'security') == true ? 'active' : '' }}" href="{{ route('accounts', ['page' => 'security']) }}">
                                            <span class="sidenav-mini-icon text-xs"> S </span>
                                            <span class="sidenav-normal"> Security </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'projects' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#projectsExample">
                                <span class="sidenav-mini-icon"> P </span>
                                <span class="sidenav-normal"> Projects <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'projects' ? 'show' : '' }}" id="projectsExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'general') == true ? 'active' : '' }}" href="{{ route('projects', ['page' => 'general']) }}">
                                            <span class="sidenav-mini-icon text-xs"> G </span>
                                            <span class="sidenav-normal"> General </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'timeline') == true ? 'active' : '' }}" href="{{ route('projects', ['page' => 'timeline']) }}">
                                            <span class="sidenav-mini-icon text-xs"> T </span>
                                            <span class="sidenav-normal"> Timeline </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'new-project') == true ? 'active' : '' }}" href="{{ route('projects', ['page' => 'new-project']) }}">
                                            <span class="sidenav-mini-icon text-xs"> N </span>
                                            <span class="sidenav-normal"> New Project </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'pricing-page') == true ? 'active' : '' }}" href="{{ route('pages', ['page' => 'pricing-page']) }}">
                                <span class="sidenav-mini-icon"> P </span>
                                <span class="sidenav-normal"> Pricing Page </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'rtl') == true ? 'active' : '' }}" href="{{ route('pages', ['page' => 'rtl']) }}">
                                <span class="sidenav-mini-icon"> R </span>
                                <span class="sidenav-normal"> RTL </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'widgets') == true ? 'active' : '' }}" href="{{ route('pages', ['page' => 'widgets']) }}">
                                <span class="sidenav-mini-icon"> W </span>
                                <span class="sidenav-normal"> Widgets </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'charts') == true ? 'active' : '' }}" href="{{ route('pages', ['page' => 'charts']) }}">
                                <span class="sidenav-mini-icon"> C </span>
                                <span class="sidenav-normal"> Charts </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'sweet-alerts') == true ? 'active' : '' }}" href="{{ route('pages', ['page' => 'sweet-alerts']) }}">
                                <span class="sidenav-mini-icon"> S </span>
                                <span class="sidenav-normal"> Sweet Alerts </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'notifications') == true ? 'active' : '' }}" href="{{ route('pages', ['page' => 'notifications']) }}">
                                <span class="sidenav-mini-icon"> N </span>
                                <span class="sidenav-normal"> Notifications </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item">
                <a data-bs-toggle="collapse" href="#applicationsExamples" class="nav-link {{ Route::currentRouteName() == 'applications' ? 'active' : '' }}"
                    aria-controls="applicationsExamples" role="button" aria-expanded="false">
                    <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                        <i class="ni ni-ui-04 text-info text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Applications</span>
                </a>
                <div class="collapse {{ Route::currentRouteName() == 'applications' ? 'show' : '' }}" id="applicationsExamples">
                    <ul class="nav ms-4">
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'kanban') == true ? 'active' : '' }}" href="{{ route('applications', ['page' => 'kanban']) }}">
                                <span class="sidenav-mini-icon"> K </span>
                                <span class="sidenav-normal"> Kanban </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'wizard') == true ? 'active' : '' }}" href="{{ route('applications', ['page' => 'wizard']) }}">
                                <span class="sidenav-mini-icon"> W </span>
                                <span class="sidenav-normal"> Wizard </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link  {{ str_contains(request()->url(), 'datatables') == true ? 'active' : '' }}" href="{{ route('applications', ['page' => 'datatables']) }}">
                                <span class="sidenav-mini-icon"> D </span>
                                <span class="sidenav-normal"> DataTables </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'calendar') == true ? 'active' : '' }}" href="{{ route('applications', ['page' => 'calendar']) }}">
                                <span class="sidenav-mini-icon"> C </span>
                                <span class="sidenav-normal"> Calendar </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'analytics') == true ? 'active' : '' }}" href="{{ route('applications', ['page' => 'analytics']) }}">
                                <span class="sidenav-mini-icon"> A </span>
                                <span class="sidenav-normal"> Analytics </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item">
                <a data-bs-toggle="collapse" href="#ecommerceExamples" class="nav-link {{ str_contains(request()->url(), 'ecommerce') == true ? 'active' : '' }}"
                    aria-controls="ecommerceExamples" role="button" aria-expanded="false">
                    <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                        <i class="ni ni-archive-2 text-success text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Ecommerce</span>
                </a>
                <div class="collapse {{ str_contains(request()->url(), 'ecommerce') == true ? 'show' : '' }}" id="ecommerceExamples">
                    <ul class="nav ms-4">
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'overview-ecommerce') == true ? 'active' : '' }}" href="{{ route('ecommerce', ['page' => 'overview-ecommerce']) }}">
                                <span class="sidenav-mini-icon"> O </span>
                                <span class="sidenav-normal"> Overview </span>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'products' ? 'actve' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#productsExample">
                                <span class="sidenav-mini-icon"> P </span>
                                <span class="sidenav-normal"> Products <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'products' ? 'show' : '' }} " id="productsExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'new-product') == true ? 'active' : '' }}" href="{{ route('products', ['page' => 'new-product']) }}">
                                            <span class="sidenav-mini-icon text-xs"> N </span>
                                            <span class="sidenav-normal"> New Product </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'edit-product') == true ? 'active' : '' }}" href="{{ route('products', ['page' => 'edit-product']) }}">
                                            <span class="sidenav-mini-icon text-xs"> E </span>
                                            <span class="sidenav-normal"> Edit Product </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'product-page') == true ? 'active' : '' }}" href="{{ route('products', ['page' => 'product-page']) }}">
                                            <span class="sidenav-mini-icon text-xs"> P </span>
                                            <span class="sidenav-normal"> Product Page </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'product-list') == true ? 'active' : '' }}" href="{{ route('products', ['page' => 'product-list']) }}">
                                            <span class="sidenav-mini-icon text-xs"> P </span>
                                            <span class="sidenav-normal"> Products List </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'orders' ? 'actve' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#ordersExample">
                                <span class="sidenav-mini-icon"> O </span>
                                <span class="sidenav-normal"> Orders <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'orders' ? 'show' : '' }}" id="ordersExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'order-list') == true ? 'active' : '' }}" href="{{ route('orders', ['page' => 'order-list']) }}">
                                            <span class="sidenav-mini-icon text-xs"> O </span>
                                            <span class="sidenav-normal"> Order List </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'details') == true ? 'active' : '' }}" href="{{ route('orders', ['page' => 'details']) }}">
                                            <span class="sidenav-mini-icon text-xs"> O </span>
                                            <span class="sidenav-normal"> Order Details </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ str_contains(request()->url(), 'referral') == true ? 'active' : '' }}" href="{{ route('ecommerce', ['page' => 'referral']) }}">
                                <span class="sidenav-mini-icon"> R </span>
                                <span class="sidenav-normal"> Referral </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item">
                <a data-bs-toggle="collapse" href="#authExamples" class="nav-link {{ str_contains(request()->url(), 'authentication') == true ? 'active' : '' }}" aria-controls="authExamples"
                    role="button" aria-expanded="false">
                    <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                        <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Authentication</span>
                </a>
                <div class="collapse {{ str_contains(request()->url(), 'authentication') == true ? 'show' : '' }}" id="authExamples">
                    <ul class="nav ms-4">
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'signins' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#signinExample">
                                <span class="sidenav-mini-icon"> S </span>
                                <span class="sidenav-normal"> Sign In <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'signins' ? 'show' : '' }}" id="signinExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'signin-basic') == true ? 'active' : '' }}" href="{{ route('signins', ['page' => 'signin-basic']) }}">
                                            <span class="sidenav-mini-icon text-xs"> B </span>
                                            <span class="sidenav-normal"> Basic </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'signin-cover') == true ? 'active' : '' }}" href="{{ route('signins', ['page' => 'signin-cover']) }}">
                                            <span class="sidenav-mini-icon text-xs"> C </span>
                                            <span class="sidenav-normal"> Cover </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'signin-illustration') == true ? 'active' : '' }}" href="{{ route('signins', ['page' => 'signin-illustration']) }}">
                                            <span class="sidenav-mini-icon text-xs"> I </span>
                                            <span class="sidenav-normal"> Illustration </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'signups' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#signupExample">
                                <span class="sidenav-mini-icon"> S </span>
                                <span class="sidenav-normal"> Sign Up <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'signups' ? 'show' : '' }}" id="signupExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'signup-basic') == true ? 'active' : '' }}" href="{{ route('signups', ['page' => 'signup-basic']) }}">
                                            <span class="sidenav-mini-icon text-xs"> B </span>
                                            <span class="sidenav-normal"> Basic </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'signup-cover') == true ? 'active' : '' }}" href="{{ route('signups', ['page' => 'signup-cover']) }}">
                                            <span class="sidenav-mini-icon text-xs"> C </span>
                                            <span class="sidenav-normal"> Cover </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'signup-illustration') == true ? 'active' : '' }}" href="{{ route('signups', ['page' => 'signup-illustration']) }}">
                                            <span class="sidenav-mini-icon text-xs"> I </span>
                                            <span class="sidenav-normal"> Illustration </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'resets' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#resetExample">
                                <span class="sidenav-mini-icon"> R </span>
                                <span class="sidenav-normal"> Reset Password <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'resets' ? 'show' : '' }}" id="resetExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'reset-basic') == true ? 'active' : '' }}" href="{{ route('resets', ['page' => 'reset-basic']) }}">
                                            <span class="sidenav-mini-icon text-xs"> B </span>
                                            <span class="sidenav-normal"> Basic </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'reset-cover') == true ? 'active' : '' }}" href="{{ route('resets', ['page' => 'reset-cover']) }}">
                                            <span class="sidenav-mini-icon text-xs"> C </span>
                                            <span class="sidenav-normal"> Cover </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'reset-illustration') == true ? 'active' : '' }}" href="{{ route('resets', ['page' => 'reset-illustration']) }}">
                                            <span class="sidenav-mini-icon text-xs"> I </span>
                                            <span class="sidenav-normal"> Illustration </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'locks' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#lockExample">
                                <span class="sidenav-mini-icon"> L </span>
                                <span class="sidenav-normal"> Lock <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'locks' ? 'show' : '' }}" id="lockExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'lock-basic') == true ? 'active' : '' }}" href="{{ route('locks', ['page' => 'lock-basic']) }}">
                                            <span class="sidenav-mini-icon text-xs"> B </span>
                                            <span class="sidenav-normal"> Basic </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'lock-cover') == true ? 'active' : '' }}" href="{{ route('locks', ['page' => 'lock-cover']) }}">
                                            <span class="sidenav-mini-icon text-xs"> C </span>
                                            <span class="sidenav-normal"> Cover </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'lock-illustration') == true ? 'active' : '' }}" href="{{ route('locks', ['page' => 'lock-illustration']) }}">
                                            <span class="sidenav-mini-icon text-xs"> I </span>
                                            <span class="sidenav-normal"> Illustration </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'verifications' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#StepExample">
                                <span class="sidenav-mini-icon"> 2 </span>
                                <span class="sidenav-normal"> 2-Step Verification <b
                                        class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'verifications' ? 'show' : '' }}" id="StepExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link  {{ str_contains(request()->url(), 'verification-basic') == true ? 'active' : '' }}" href="{{ route('verifications', ['page' => 'verification-basic']) }}">
                                            <span class="sidenav-mini-icon text-xs"> B </span>
                                            <span class="sidenav-normal"> Basic </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link  {{ str_contains(request()->url(), 'verification-cover') == true ? 'active' : '' }}" href="{{ route('verifications', ['page' => 'verification-cover']) }}">
                                            <span class="sidenav-mini-icon text-xs"> C </span>
                                            <span class="sidenav-normal"> Cover </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), 'verification-illustration') == true ? 'active' : '' }}" href="{{ route('verifications', ['page' => 'verification-illustration']) }}">
                                            <span class="sidenav-mini-icon text-xs"> I </span>
                                            <span class="sidenav-normal"> Illustration </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link {{ Route::currentRouteName() == 'errors' ? 'active' : '' }}" data-bs-toggle="collapse" aria-expanded="false"
                                href="#errorExample">
                                <span class="sidenav-mini-icon"> E </span>
                                <span class="sidenav-normal"> Error <b class="caret"></b></span>
                            </a>
                            <div class="collapse {{ Route::currentRouteName() == 'errors' ? 'show' : '' }}" id="errorExample">
                                <ul class="nav nav-sm flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), '404') == true ? 'active' : '' }}" href="{{ route('errors', ['page' => '404']) }}">
                                            <span class="sidenav-mini-icon text-xs"> E </span>
                                            <span class="sidenav-normal"> Error 404 </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link {{ str_contains(request()->url(), '500') == true ? 'active' : '' }}" href="{{ route('errors', ['page' => '500']) }}">
                                            <span class="sidenav-mini-icon text-xs"> E </span>
                                            <span class="sidenav-normal"> Error 500 </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
    <div class="sidenav-footer mx-3 my-3">
        <div class="card card-plain shadow-none" id="sidenavCard">
            <img class="w-60 mx-auto" src="/assets/img/illustrations/icon-documentation-warning.svg"
                alt="sidebar_illustration">
            <div class="card-body text-center p-3 w-100 pt-0">
                <div class="docs-info">
                    <h6 class="mb-0">Need help?</h6>
                    <p class="text-xs font-weight-bold mb-0">Please check our docs</p>
                </div>
            </div>
        </div>
        <a href="/docs/bootstrap/overview/argon-dashboard/index.html" target="_blank"
            class="btn btn-dark btn-sm w-100 mb-3">Documentation</a>
        <a class="btn btn-primary btn-sm mb-0 w-100"
            href="https://www.creative-tim.com/product/argon-dashboard-pro-laravel" type="button" target="_blank">Upgrade to PRO</a>
    </div>
</aside>
