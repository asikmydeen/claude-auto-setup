@extends('layouts.app', ['class' => 'landing'])

@section('content')
    <div class="container-fluid py-4">
      <div class="row min-vh-80">
        <div class="d-none d-lg-block">
        <div class="col-lg-10">
            <div class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right z-index-3 mt-7">
              <a class="w-100" href="{{ route('dashboards', ['page' => 'default']) }}">
                <img class="w-100 border-radius-lg" src="assets/img/dashboard.jpg" alt="default page">
              </a>
            </div>
            <div class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right-sm z-index-2 mt-3">
              <img class="w-100 border-radius-lg" src="assets/img/automotive-warning.png" alt="default page">
            </div>
            <div class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right-xs z-index-1">
              <img class="w-100 border-radius-lg" src="assets/img/crm-warning.png" alt="default page">
            </div>
          </div>
        </div>
        <div class="d-lg-none d-none d-md-block">
          <div class="col-lg-10">
            <div class="p-3 border-radius-xl blur shadow-xl z-index-3 mt-5">
              <img class="w-100 border-radius-lg" src="assets/img/default-warning.png" alt="default page">
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-2 mt-4">
              <img class="w-100 border-radius-lg" src="assets/img/automotive-warning.png" alt="default page">
            </div>
          </div>
        </div>
        <div class="d-lg-none d-md-none">
          <div class="col-lg-10">
            <div class="p-3 border-radius-xl blur shadow-xl z-index-3 mt-5">
              <img class="w-100 border-radius-lg" src="assets/img/default-warning.png" alt="default page">
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-2 mt-4">
              <img class="w-100 border-radius-lg" src="assets/img/automotive-warning.png" alt="default page">
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-1 mt-4">
              <img class="w-100 border-radius-lg" src="assets/img/crm-warning.png" alt="default page">
            </div>
          </div>
        </div>
      </div>
    </div>
@endsection
