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
            style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reset-basic.jpg');">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-7">
                        <div class="card z-index-0 mb-7">
                            <div class="card-header text-center pt-4 pb-1">
                                <h4 class="font-weight-bolder mb-1">Reset password</h4>
                                <p class="mb-0">You will receive an e-mail in maximum 60 seconds</p>
                            </div>
                            <div class="card-body">
                                <form role="form">
                                    <div class="mb-3">
                                        <input type="email" class="form-control" placeholder="Email" aria-label="Email">
                                    </div>
                                    <div class="text-center">
                                        <button type="button"
                                            class="btn bg-gradient-dark btn-lg w-100 my-4 mb-2">Send</button>
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
