@extends('layouts.app', ['activePage' => 'google', 'activeButton' => 'maps', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Google Maps'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card ">
                        <div class="card-header ">
                            <h4 class='card-title'>Satellite Map</h4>
                        </div>
                        <div class="card-body ">
                            <div id="satelliteMap" class="map map-big"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card ">
                        <div class="card-header ">
                            <h4 class='card-title'>Regular Map</h4>
                        </div>
                        <div class="card-body ">
                            <div id="regularMap" class="map"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card ">
                        <div class="card-header ">
                            <h4 class='card-title'>Custom Skin & Settings Map</h4>
                        </div>
                        <div class="card-body ">
                            <div id="customSkinMap" class="map"></div>
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
            // Javascript method's body can be found in assets/js/demos.js
            demo.initSmallGoogleMaps();

        });
    </script>
@endpush