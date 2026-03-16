<!-- Navbar -->
<nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
        <div class="navbar-wrapper">
            <div class="navbar-minimize">
                <button id="minimizeSidebar" class="btn btn-warning btn-fill btn-round btn-icon d-none d-lg-block">
                    <i class="fa fa-ellipsis-v visible-on-sidebar-regular"></i>
                    <i class="fa fa-navicon visible-on-sidebar-mini"></i>
                </button>
            </div>
            <a class="navbar-brand" href="#pablo"> {{ $navName }} </a>
        </div>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar burger-lines"></span>
            <span class="navbar-toggler-bar burger-lines"></span>
            <span class="navbar-toggler-bar burger-lines"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end">
            <ul class="nav navbar-nav mr-auto">
                <form class="navbar-form navbar-left navbar-search-form" role="search">
                    <div class="input-group">
                        <i class="nc-icon nc-zoom-split"></i>
                        <input type="text" value="" class="form-control" placeholder="Search...">
                    </div>
                </form>
            </ul>
            <ul class="navbar-nav">
                @if(config('app.is_demo'))
            <a class="btn btn-danger mt-3 mr-3" target="_blank" href="https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-laravel"><i class="tim-icons icon-cart"></i> Buy Now</a>
            <a id="docs" class="btn btn-success mt-3 mr-3" target="_blank" href="https://light-bootstrap-dashboard-pro-laravel.creative-tim.com/docs/tutorial-components.html?_ga=2.259028360.363287727.1606225754-873527063.1586251280"><i class="tim-icons icon-book-bookmark"></i> Documentation</a>
        @endif
                <li class="dropdown nav-item">
                    <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                        <i class="nc-icon nc-planet"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="#">{{ __('Create New Post') }}</a>
                        <a class="dropdown-item" href="#">{{__('Manage Something')}}</a>
                        <a class="dropdown-item" href="#">{{ __('Do Nothing') }}</a>
                        <a class="dropdown-item" href="#">{{ __('Submit to live') }}</a>
                        <li class="divider"></li>
                        <a class="dropdown-item" href="#">{{ __('Another action') }}</a>
                    </ul>
                </li>
                <li class="dropdown nav-item">
                    <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                        <i class="nc-icon nc-bell-55"></i>
                        <span class="notification">{{ __('5') }}</span>
                        <span class="d-lg-none">{{ __('Notification') }}</span>
                    </a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="#">{{ __('Notification 1') }}</a>
                        <a class="dropdown-item" href="#">{{ __('Notification 2') }}</a>
                        <a class="dropdown-item" href="#">{{ __('Notification 3')}}</a>
                        <a class="dropdown-item" href="#">{{ __('Notification 4') }}</a>
                        <a class="dropdown-item" href="#">{{ __('Notification 5') }}</a>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="nc-icon nc-bullet-list-67"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" id="logout">
                        <a class="dropdown-item" href="{{ route('profile.edit') }}">
                            <i class="nc-icon nc-single-02"></i> {{ __('My Profile') }}
                        </a>
                        <div class="divider"></div>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>

                        <a class="dropdown-item text-danger" id="logout-btn" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="nc-icon nc-button-power"></i> {{ __('Log out') }}
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
<!-- End Navbar -->
