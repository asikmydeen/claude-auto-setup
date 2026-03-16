@extends('user_type.auth', ['parentFolder' => 'authentication', 'childFolder' => 'error', 'hasFooter' => 'footer', 'navbar' => 'cover'])

@section('content')
<!--navbar basic-->
  <main class="main-content  mt-0">
    <section class="my-10">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 my-auto">
            <h1 class="display-1 text-bolder text-gradient text-danger">Error 403</h1>
            <h2>Erm. Forbidden :(</h2>
            <p class="lead">We suggest you to go to the homepage while we solve this issue.</p>
            <a href="/dashboard-default" type="button" class="btn bg-gradient-dark mt-4">Go to Homepage</a>
          </div>
          <div class="col-lg-6 my-auto position-relative">
            <img class="w-100 position-relative" src="{{ URL::asset('assets/img/illustrations/error-404.png') }}" alt="404-error">
          </div>
        </div>
      </div>
    </section>
  </main>
<!--footer socials-->
@endsection