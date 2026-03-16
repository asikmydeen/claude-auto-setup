<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
    <div class="container-fluid">
        <div class="navbar-wrapper">
            <div class="navbar-minimize">
                <button id="minimizeSidebar" class="btn btn-just-icon btn-white btn-fab btn-round">
                    <i class="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
                    <i class="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
                </button>
            </div>
            <a class="navbar-brand" style="color:black" href="#pablo">{{ $titlePage }}</a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index"
            aria-expanded="false" aria-label="Toggle navigation" data-target="#sectionsNavbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="sectionsNavbar">
            <form class="navbar-form">
            </form>
            <ul class="navbar-nav">
                <li class="button-container nav-item iframe-extern">
                    <a href="https://www.creative-tim.com/product/material-blog-pro-laravel" target="_blank" class="btn  btn-rose   btn-round btn-block">
                        <i class="material-icons">shopping_cart</i> Buy Now
                    </a>
                </li>
                <li class="nav-item{{ $activePage == 'widgets' ? ' active' : '' }} ">
                    <a class="nav-link" target="_blank" href="https://material-blog-pro-laravel.creative-tim.com/docs/material-blog-laravel/docs/getting-started/laravel-setup.html?_ga=2.195064110.363287727.1606225754-873527063.1586251280">
                      <i class="material-icons">file_copy</i>
                       Documentation
                    </a>
                  </li>
                  <li class="nav-item ">
                    <a class="nav-link" href="/material/landing.html">
                      <i class="material-icons">favorite</i>
                      Presentation
                      
                    </a>
                  </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('home') }}">
                        <i _ngcontent-gbk-c19="" class="material-icons icon-image-preview">home</i> Go to blog
                        <p class="d-lg-none d-md-block">
                            {{ __('Stats') }}
                        </p>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#pablo" id="navbarDropdownProfile" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">person</i> Profile
                        <p class="d-lg-none d-md-block">
                            {{ __('Account') }}
                        </p>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                        <a class="dropdown-item" href="{{ route('profile.edit') }}">{{ __('Profile') }}</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="{{ route('logout') }}"
                            onclick="event.preventDefault();document.getElementById('logout-form').submit();">{{ __('Log out') }}</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
<!-- End Navbar -->