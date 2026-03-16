@extends('app')

@section('auth')
    @if ($parentFolder == 'authentication')
        @if ($navbar == 'basic')
            @include('layouts/navbars/auth/nav-auth-basic')
        @else
            <div class="container position-sticky z-index-sticky top-0">
                <div class="row">
                    <div class="col-12">
                        @include('layouts/navbars/auth/nav-auth-cover')
                    </div>
                </div>
            </div>
        @endif
        <main class="main-content max-height-vh-100 h-100">
            @yield('content')
            @if ($hasFooter == 'footer')
                @include('layouts/footers/guest/footer')
            @endif
        </main>
    @else
        @if (\Request::is('dashboard-virtual-default')||Request::is('dashboard-virtual-info'))
            <div>
                @include('layouts/navbars/auth/nav')
            </div>
            <div class="virtual-reality">
                <div class="border-radius-xl mt-3 mx-3 position-relative" style="background-image: url('assets/img/vr-bg.jpg') ; background-size: cover;">
                    @include('layouts/navbars/auth/sidebar')
                    @yield('content')
                </div>
                @include('layouts/footers/auth/footer')
            </div>
        @elseif (\Request::is('pages-pricing'))
            @include('layouts/navbars/auth/nav-auth-basic')
            @yield('content')
            @include('layouts/footers/guest/footer')
        @else
            @include('layouts/navbars/auth/sidebar')
            <main class="main-content max-height-vh-100 h-100 {{ (Request::is('ecommerce-products-new-product')||$childFolder == 'profile' ? 'position-relative bg-gray-100' : (Request::is('pages-rtl') ? 'position-relative border-radius-lg overflow-hidden' : 'position-relative border-radius-lg')) }}">
                @if (\Request::is('pages-rtl'))
                    @include('layouts/navbars/auth/nav-rtl')
                @else
                    @include('layouts/navbars/auth/nav')
                @endif
                @if($childFolder == 'profile'||$childFolder == 'account'||Request::is('ecommerce-products-new-product')) 
                    @yield('content')
                @else
                    <div class="container-fluid py-4">
                        @yield('content')
                        @include('layouts/footers/auth/footer')
                    </div>
                @endif
            </main>
        @endif
        @include('components/fixed-plugins')
    @endif
@endsection