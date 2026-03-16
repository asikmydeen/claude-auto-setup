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
        <div class="page-header min-vh-100" style="background-image: url('/assets/img/illustrations/404.svg');">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-7 mx-auto text-center">
                        <h1 class="display-1 text-bolder text-primary">Error 404</h1>
                        <h2>Erm. Page not found</h2>
                        <p class="lead">We suggest you to go to the homepage while we solve this issue.</p>
                        <a href="/default" class="btn bg-gradient-dark mt-4">Go to Homepage</a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    @include('layouts.footers.auth.desc-footer')
@endsection
