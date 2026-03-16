@extends('layouts.app')

@section('content')
    @include('layouts.navbars.auth.topnav-auth', [
        'classes' => 'top-0 z-index-3 w-100 shadow-none my-3 navbar-transparent mt-4',
        'container' => 'container',
        'text' => 'text-white',
        'arrow' => '/assets/img/down-arrow-white.svg',
    ])
    <main class="main-content  mt-0">
        <div class="page-header min-vh-100"
            style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/verification-basic.jpg');">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-7">
                        <div class="card">
                            <div class="card-body px-lg-5 py-lg-5 text-center">
                                <div class="info mb-4">
                                    <div
                                        class="icon icon-shape icon-xl rounded-circle bg-gradient-info shadow text-center mx-auto">
                                        <i class="ni ni-spaceship opacity-10"></i>
                                    </div>
                                </div>
                                <div class="text-center text-muted mb-4">
                                    <h2>2-Step Verification</h2>
                                </div>
                                <div class="row gx-2 gx-sm-3">
                                    <div class="col">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-lg" maxlength="1"
                                                autocomplete="off" autocapitalize="off">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-lg" maxlength="1"
                                                autocomplete="off" autocapitalize="off">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-lg" maxlength="1"
                                                autocomplete="off" autocapitalize="off">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-lg" maxlength="1"
                                                autocomplete="off" autocapitalize="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn bg-gradient-info w-100">Send code</button>
                                    <span class="text-muted text-sm">Haven't received it?<a href="javascript:;"> Resend a
                                            new code</a>.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
