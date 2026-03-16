@extends('layouts.app',[
    'class' => 'lock-page',
    'folderActive' => '',
    'elementActive' => '',
    'backgroundImagePath' => 'img/bg/bruno-abatti.jpg'
])

@section('content')
    <div class="content">
        <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
                <div class="card card-lock text-center">
                    <div class="card-header ">
                        <img src="{{ asset('img/faces/joe-gardner-2.jpg') }}" alt="...">
                    </div>
                    <div class="card-body ">
                        <h4 class="card-title">{{ __('Joe Gardner') }}</h4>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Enter Password..">
                        </div>
                    </div>
                    <div class="card-footer ">
                        <a href="#pablo" class="btn btn-outline-default btn-round">{{ __('Unlock') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        $(document).ready(function() {
            demo.checkFullPageBackgroundImage();
        });
    </script>
@endpush