@extends('layouts.app', ['activePage' => 'charts', 'activeButton' => 'laravel', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Charts'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card ">
                            <div class="card-header ">
                                <h4 class="card-title">{{ __('24 Hours Performance') }}</h4>
                                <p class="card-category">{{ __('Line Chart') }}</p>
                            </div>
                            <div class="card-body ">
                                <div id="chartPerformance" class="ct-chart "></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card ">
                            <div class="card-header ">
                                <h4 class="card-title">{{ __('NASDAQ: AAPL') }}</h4>
                                <p class="card-category">{{ __('Line Chart with Points') }}</p>
                            </div>
                            <div class="card-body ">
                                <div id="chartStock" class="ct-chart "></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card ">
                            <div class="card-header ">
                                <h4 class="card-title">{{ __('User Behavior') }}</h4>
                                <p class="card-category">{{ __('Multiple Lines Charts') }}</p>
                            </div>
                            <div class="card-body ">
                                <div id="chartBehaviour" class="ct-chart"></div>
                            </div>
                            <div class="card-footer ">
                                <div class="legend">
                                    <i class="fa fa-circle text-info"></i> {{ __('Open') }}
                                    <i class="fa fa-circle text-danger"></i> {{ __('Click') }}
                                    <i class="fa fa-circle text-warning"></i> {{ __('Click Second Time') }}
                                </div>
                                <hr>
                                <div class="stats">
                                    <i class="fa fa-history"></i> {{ __('Updated 3 minutes ago') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card ">
                            <div class="card-header ">
                                <h4 class="card-title">{{ __('Public Preferences') }}</h4>
                                <p class="card-category">{{ __('Pie Chart') }}</p>
                            </div>
                            <div class="card-body ">
                                <div id="chartPreferences" class="ct-chart ct-perfect-fourth"></div>
                            </div>
                            <div class="card-footer ">
                                <div class="legend">
                                    <i class="fa fa-circle text-info"></i> {{__('Open')}}
                                    <i class="fa fa-circle text-danger"></i> {{__('Bounce')}}
                                    <i class="fa fa-circle text-warning"></i> {{__('Unsubscribe')}}
                                </div>
                                <hr>
                                <div class="stats">
                                    <i class="fa fa-clock-o"></i> {{__('Campaign sent 2 days ago')}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card ">
                            <div class="card-header ">
                                <h4 class="card-title">{{__('Views')}}</h4>
                                <p class="card-category">{{__('Bar Chart')}}</p>
                            </div>
                            <div class="card-body ">
                                <div id="chartViews" class="ct-chart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card ">
                            <div class="card-header ">
                                <h4 class="card-title">{{__('Activity')}}</h4>
                                <p class="card-category">{{__('Multiple Bars Chart')}}</p>
                            </div>
                            <div class="card-body ">
                                <div id="chartActivity" class="ct-chart"></div>
                            </div>
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
            demo.initCharts();
        });
    </script>
@endpush