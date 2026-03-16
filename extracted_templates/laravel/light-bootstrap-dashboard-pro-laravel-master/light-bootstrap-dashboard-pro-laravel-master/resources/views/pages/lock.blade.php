@extends('layouts.app', ['activePage' => 'lock', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'activeButton' => 'laravel'])

@section('content')
    <div class="full-page lock-page" data-color="purple" data-image="img/bg4.jpg">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
            <div class="container">
                <div class="col-md-4 ml-auto mr-auto">
                    <div class="card card-lock text-center card-plain">
                        <div class="card-header ">
                            <div class="author">
                                <img class="avatar" src="img/default-avatar.png" alt="...">
                            </div>
                        </div>
                        <div class="card-body ">
                            <h4 class="card-title">{{"Someone"}}</h4>
                            <div class="form-group">
                                <input type="password" placeholder="Enter Password" class="form-control">
                            </div>
                        </div>
                        <div class="card-footer ">
                            <a href="#pablo" class="btn btn-info btn-round">{{__('Unlock')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        $(document).ready(function() {
            demo.checkFullPageBackgroundImage();

            setTimeout(function() {
                // after 1000 ms we add the class animated to the login/register card
                $('.card').removeClass('card-hidden');
            }, 700)
        });
    </script>
@endpush