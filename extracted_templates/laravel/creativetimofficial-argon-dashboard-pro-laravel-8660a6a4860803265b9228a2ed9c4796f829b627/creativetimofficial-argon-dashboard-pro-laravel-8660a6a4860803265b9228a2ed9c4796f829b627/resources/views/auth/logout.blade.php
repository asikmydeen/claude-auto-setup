<form role="form" method="post" action="{{ route('logout') }}" id="logout-form">
    @csrf
    <a href="{{ route('logout') }}"
            onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
            class="nav-link text-white font-weight-bold px-0">
    <i class="fa fa-user me-sm-1"></i>
    <span class="d-sm-inline d-none">Log out</span>
    </a>
</form>
