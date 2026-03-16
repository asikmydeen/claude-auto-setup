@extends('layouts.app', ['activePage' => 'calendar', 'activeButton' => 'laravel', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Chalendar'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="header text-center">
                <h3 class="title">{{__('FullCalendar.io')}}</h3>
                <small class="category">{{__('Handcrafted by our friends from')}}
                    <a target="_blank" href="https://fullcalendar.io/">{{__('FullCalendar.io')}}</a>. {{__('Please checkout their')}}
                    <a href="https://fullcalendar.io/docs/" target="_blank">{{__('full documentation.')}}</a>
                </small>
            </div>
            <br />
            <div class="row">
                <div class="col-md-10 ml-auto mr-auto">
                    <div class="card card-calendar">
                        <div class="card-body ">
                            <div id="fullCalendar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script type="text/javascript">
        $(document).ready(function() {
            demo.initFullCalendar();
        });
    </script>
@endpush