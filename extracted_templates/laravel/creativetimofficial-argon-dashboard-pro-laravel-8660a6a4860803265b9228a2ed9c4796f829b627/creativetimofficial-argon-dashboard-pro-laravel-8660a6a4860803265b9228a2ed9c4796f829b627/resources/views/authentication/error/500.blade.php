@extends('layouts.app', ['class' => 'error-page'])

@section('content')
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                @include('layouts.navbars.auth.topnav-auth', [
                    'classes' => 'mt-4 blur border-radius-lg top-0 z-index-3 shadow py-2 start-0 end-0 mx-4',
                ])
            </div>
        </div>
    </div>
    <main class="main-content  mt-0">
        <div class="page-header min-vh-100"
            style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/error-500.jpg');">
            <span class="mask bg-gradient-warning opacity-4"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-7 mx-auto text-center">
                        <h1 class="display-1 text-bolder text-white fadeIn1 fadeInBottom mt-5">Error 500</h1>
                        <h2 class="fadeIn3 fadeInBottom mt-3 text-white">Something went wrong</h2>
                        <p class="lead fadeIn2 fadeInBottom text-white">We suggest you to go to the homepage while we solve
                            this issue.</p>
                        <a href="/default" class="btn bg-gradient-dark mt-4 fadeIn2 fadeInBottom">Go to Homepage</a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    @include('layouts.footers.auth.desc-footer')
@endsection
