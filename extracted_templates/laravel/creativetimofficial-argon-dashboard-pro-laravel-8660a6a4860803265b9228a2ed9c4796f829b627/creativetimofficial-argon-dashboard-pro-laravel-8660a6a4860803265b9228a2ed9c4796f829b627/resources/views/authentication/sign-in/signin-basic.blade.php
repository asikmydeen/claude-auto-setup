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
            style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg');">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-7">
                        <div class="card border-0 mb-0">
                            <div class="card-header bg-transparent">
                                <h5 class="text-dark text-center mt-2 mb-3">Sign in</h5>
                                <div class="btn-wrapper text-center">
                                    <a href="javascript:;" class="btn btn-neutral btn-icon btn-sm mb-0">
                                        <img class="w-30" src="../../../assets/img/logos/github.svg">
                                        Github
                                    </a>
                                    <a href="javascript:;" class="btn btn-neutral btn-icon btn-sm mb-0">
                                        <img class="w-30" src="../../../assets/img/logos/google.svg">
                                        Google</span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body px-lg-5 pt-0">
                                <div class="text-center text-muted mb-4">
                                    <small>Or sign in with credentials</small>
                                </div>
                                <form role="form" class="text-start">
                                    <div class="mb-3">
                                        <input type="email" class="form-control" placeholder="Email" aria-label="Email">
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" class="form-control" placeholder="Password"
                                            aria-label="Password">
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="rememberMe">
                                        <label class="form-check-label" for="rememberMe">Remember me</label>
                                    </div>
                                    <div class="text-center">
                                        <button type="button" class="btn btn-primary w-100 my-4 mb-2">Sign in</button>
                                    </div>
                                    <div class="mb-2 position-relative text-center">
                                        <p
                                            class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                                            or
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <button type="button" class="btn bg-gradient-dark w-100 mt-2 mb-4">Sign up</button>
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
