<!-- Navbar -->
<nav class="navbar navbar-expand-lg position-absolute top-0 z-index-3 my-3 {{ (Request::is('login/forgot-password') ? 'blur blur-rounded shadow py-2 start-0 end-0 mx4' : 'w-100 shadow-none navbar-transparent mt-4') }}">
  <div class="{{ (\Request::is('login/forgot-password') ? 'container-fluid' : 'container') }}">
    <a class="navbar-brand d-flex flex-column font-weight-bolder ms-lg-0 ms-3 text-white {{ (Request::is('login/forgot-password') ? 'text-black' : 'text-white') }}" href="{{ url('dashboard-default') }}">
        Soft UI Dashboard
        <span>PRO Laravel</span>
    </a>
    <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon mt-2">
        <span class="navbar-toggler-bar bar1"></span>
        <span class="navbar-toggler-bar bar2"></span>
        <span class="navbar-toggler-bar bar3"></span>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="navigation">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <a class="nav-link me-2" href="{{ url('register') }}">
            <i class="fas fa-user-circle opacity-6 me-1 {{ (Request::is('login/forgot-password') ? 'text-dark' : '') }}"></i>
            Sign Up
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link me-2" href="{{ url('login') }}">
            <i class="fas fa-key opacity-6 me-1 {{ (Request::is('login/forgot-password') ? 'text-dark' : '') }}"></i>
            Sign In
          </a>
        </li>
      </ul>
      <ul class="navbar-nav d-lg-block d-none">
        <li class="nav-item">
          <a href="https://www.creative-tim.com/product/soft-ui-dashboard-pro-laravel" target="_blank" class="btn btn-sm btn-round mb-0 me-1 bg-gradient-{{ (Request::is('login/forgot-password') ? 'dark' : 'primary') }}">Buy Now</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<!-- End Navbar -->
