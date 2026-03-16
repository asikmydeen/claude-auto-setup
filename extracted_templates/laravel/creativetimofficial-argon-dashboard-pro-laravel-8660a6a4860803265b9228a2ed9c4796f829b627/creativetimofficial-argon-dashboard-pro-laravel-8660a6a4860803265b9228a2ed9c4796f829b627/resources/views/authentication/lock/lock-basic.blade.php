@extends('layouts.app')

@section('content')
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                @include('layouts.navbars.auth.topnav-auth', [
                    'classes' =>
                        'blur border-radius-lg top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4',
                ])
            </div>
        </div>
    </div>
    <main class="main-content main-content-bg mt-0">
        <div class="page-header min-vh-100"
            style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/lock-basic.jpg');">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-7">
                        <div class="card py-lg-3">
                            <div class="card-body text-center">
                                <h4 class="mb-0 font-weight-bolder">Mike Priesler</h4>
                                <p class="mb-4">Enter password to unlock your account.</p>
                                <form role="form">
                                    <div class="mb-3">
                                        <input type="password" class="form-control" placeholder="Password"
                                            aria-label="password">
                                    </div>
                                    <div class="text-center">
                                        <button type="button" class="btn btn-lg w-100 bg-gradient-dark mb-0">Unlock</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    @include('layouts.footers.auth.desc-footer')
@endsection
