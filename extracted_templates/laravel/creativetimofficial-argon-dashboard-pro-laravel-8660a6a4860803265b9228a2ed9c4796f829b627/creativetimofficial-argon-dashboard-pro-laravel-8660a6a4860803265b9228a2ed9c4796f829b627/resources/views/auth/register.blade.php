@extends('layouts.app')

@section('content')
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                @include('layouts.navbars.guest.topnav', [
                    'classes' => 'mt-4 blur border-radius-lg top-0 z-index-3 shadow py-2 start-0 end-0 mx-4',
                ])
            </div>
        </div>
    </div>
    <main class="main-content  mt-0">
        <section>
            <div class="page-header min-vh-100">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                            <div class="card card-plain">
                                <div class="card-header pb-0 text-left">
                                    <h4 class="font-weight-bolder">Sign Up</h4>
                                    <p class="mb-0">Enter your email and password to register</p>
                                </div>
                                <div class="card-body pb-3">
                                    <form role="form" method="POST" aciton="{{ route('register.perform') }}">
                                        @csrf
                                        <label>Name</label>
                                        <div class="mb-3">
                                            <input type="text" name="firstname" class="form-control" placeholder="Firstaname" value="{{ old('firstname') }}"  aria-label="Name">
                                            @error('firstname') <p class='text-danger text-xs pt-1'> {{ $message }} </p> @enderror
                                        </div>
                                        <label>Email</label>
                                        <div class="mb-3">
                                            <input type="email" name="email" class="form-control" placeholder="Email" value="{{ old('email') }}"  aria-label="Email">
                                            @error('email') <p class='text-danger text-xs pt-1'> {{ $message }} </p> @enderror
                                        </div>
                                        <label>Role</label>
                                        <div class="mb-3">
                                            <select name="role" id="input-role" class="form-control{{ $errors->has('role_id') ? ' is-invalid' : '' }}" placeholder="{{ __('Role') }}" required>
                                                <option value="">Role</option>
                                                <option value="1" @if (old('user_type') == 1) selected @endif>Admin</option>
                                                <option value="2" @if (old('user_type') == 2) selected @endif>Creator</option>
                                                <option value="3" @if (old('user_type') == 3) selected @endif>Member</option>
                                            </select>
                                            @error('role') <p class='text-danger text-xs'> {{ $message }} </p> @enderror
                                        </div>
                                        <label>Password</label>
                                        <div class="mb-3">
                                            <input type="password" name="password" class="form-control" placeholder="Password"
                                                aria-label="Password">
                                            @error('password') <p class='text-danger text-xs pt-1'> {{ $message }} </p> @enderror
                                        </div>
                                        <div class="form-check form-check-info text-left">
                                            <input name="terms" class="form-check-input" type="checkbox" id="flexCheckDefault">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                I agree the <a href="../../../pages/privacy.html"
                                                    class="text-dark font-weight-bolder">Terms and Conditions</a>
                                            </label>
                                        </div>
                                        @error('terms') <p class='text-danger text-xs'> {{ $message }} </p> @enderror
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary w-100 mt-4 mb-0">Sign up</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer text-center pt-0 px-sm-4 px-1">
                                    <p class="mb-4 mx-auto">
                                        Already have an account?
                                        <a href="{{ route('login') }}"
                                            class="text-primary font-weight-bold">Sign in</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                            <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-ill.jpg');
              background-size: cover;">
                                <span class="mask bg-primary opacity-4"></span>
                                <h4 class="mt-5 text-white font-weight-bolder position-relative">Your journey starts here
                                </h4>
                                <p class="text-white position-relative">Just as it takes a company to sustain a product, it
                                    takes a community to sustain a protocol.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
@endsection
