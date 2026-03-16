@extends('layouts.app', ['activePage' => 'extended-forms', 'activeButton' => 'forms', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Extended Forms'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="card">
                    <div class="card-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-4">
                                    <h4 class="title">Datetime Picker</h4>
                                    <div class="form-group">
                                        <input id="datetimepicker" type="text" class="form-control datetimepicker" placeholder="Datetime Picker Here" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <h4 class="title">Date Picker</h4>
                                    <div class="form-group">
                                        <input type="text" class="form-control datepicker" placeholder="Date Picker Here" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <h4 class="title">Time Picker</h4>
                                    <div class="form-group">
                                        <input type="text" class="form-control timepicker" placeholder="Time Picker Here" />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div class="row">
                                <div class="col-md-6">
                                    <h4 class="title">Switches</h4>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <p class="category">Default</p>
                                            <input type="checkbox" checked="" data-toggle="switch" data-on-color="info" data-off-color="info">
                                            <span class="toggle"></span>
                                            <input type="checkbox" data-toggle="switch" data-on-color="info" data-off-color="info">
                                            <span class="toggle"></span>
                                        </div>
                                        <div class="col-md-4">
                                            <p class="category">Plain</p>
                                            <input type="checkbox" checked="" data-toggle="switch" data-on-color="info" data-off-color="info" data-on-text="" data-off-text="">
                                            <span class="toggle"></span>
                                            <input type="checkbox" data-toggle="switch" data-on-color="info" data-off-color="info" data-on-text="" data-off-text="">
                                            <span class="toggle"></span>
                                        </div>
                                        <div class="col-md-4">
                                            <p class="category">With Icons</p>
                                            <input type="checkbox" checked="" data-toggle="switch" data-on-color="info" data-off-color="info" data-on-text="<i class='fa fa-check'></i>" data-off-text="<i class='fa fa-times'></i>">
                                            <span class="toggle"></span>
                                            <input type="checkbox" data-toggle="switch" data-on-color="info" data-off-color="info" data-on-text="<i class='fa fa-check'></i>" data-off-text="<i class='fa fa-times'></i>">
                                            <span class="toggle"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div class="row">
                                <div class="col-md-6">
                                    <h4 class="title">Tags</h4>
                                    <!-- You can change "tag-azure" with with "tag-blue", "tag-green", "tag-orange","tag-red" and you can also add "tag-fill" for having filled tags -->
                                    <div id="badge">
                                        Regular:
                                        <input type="text" value="Minimal, Light, New, Friends" data-role="tagsinput" /> Filled:
                                        <input data-role="tagsinput" class="tagsinput badge-azure badge-fill" value="Design & UI, Inspiration, Business, Lifestyle" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h4 class="title">Customisable Select</h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <select name="cities" class="selectpicker" data-title="Single Select" data-style="btn-default btn-outline" data-menu-style="dropdown-blue">
                                                <option value="id">Bahasa Indonesia</option>
                                                <option value="ms">Bahasa Melayu</option>
                                                <option value="ca">Català</option>
                                                <option value="da">Dansk</option>
                                                <option value="de">Deutsch</option>
                                                <option value="en">English</option>
                                                <option value="es">Español</option>
                                                <option value="el">Eλληνικά</option>
                                                <option value="fr">Français</option>
                                                <option value="it">Italiano</option>
                                                <option value="hu">Magyar</option>
                                                <option value="nl">Nederlands</option>
                                                <option value="no">Norsk</option>
                                                <option value="pl">Polski</option>
                                                <option value="pt">Português</option>
                                                <option value="fi">Suomi</option>
                                                <option value="sv">Svenska</option>
                                                <option value="tr">Türkçe</option>
                                                <option value="is">Íslenska</option>
                                                <option value="cs">Čeština</option>
                                                <option value="ru">Русский</option>
                                                <option value="th">ภาษาไทย</option>
                                                <option value="zh">中文 (简体)</option>
                                                <option value="zh-TW">中文 (繁體)</option>
                                                <option value="ja">日本語</option>
                                                <option value="ko">한국어</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <select multiple data-title="Multiple Select" name="currency" class="selectpicker" data-style="btn-info btn-fill btn-block" data-menu-style="dropdown-blue">
                                                <option value="ARS">ARS</option>
                                                <option value="AUD">AUD</option>
                                                <option value="BRL">BRL</option>
                                                <option value="CAD">CAD</option>
                                                <option value="CHF">CHF</option>
                                                <option value="CNY">CNY</option>
                                                <option value="CZK">CZK</option>
                                                <option value="DKK">DKK</option>
                                                <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                                <option value="HKD">HKD</option>
                                                <option value="HUF">HUF</option>
                                                <option value="IDR">IDR</option>
                                                <option value="ILS">ILS</option>
                                                <option value="INR">INR</option>
                                                <option value="JPY">JPY</option>
                                                <option value="KRW">KRW</option>
                                                <option value="MYR">MYR</option>
                                                <option value="MXN">MXN</option>
                                                <option value="NOK">NOK</option>
                                                <option value="NZD">NZD</option>
                                                <option value="PHP">PHP</option>
                                                <option value="PLN">PLN</option>
                                                <option value="RUB">RUB</option>
                                                <option value="SEK">SEK</option>
                                                <option value="SGD">SGD</option>
                                                <option value="TWD">TWD</option>
                                                <option value="USD">USD</option>
                                                <option value="VND">VND</option>
                                                <option value="ZAR">ZAR</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div class="row">
                                <div class="col-md-6">
                                    <h4 class="title">Progress Bar</h4>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">
                                            <span class="sr-only">60% Complete</span>
                                        </div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                                            <span class="sr-only">60% Complete</span>
                                        </div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-success" style="width: 35%">
                                            <span class="sr-only">35% Complete (success)</span>
                                        </div>
                                        <div class="progress-bar progress-bar-warning" style="width: 20%">
                                            <span class="sr-only">20% Complete (warning)</span>
                                        </div>
                                        <div class="progress-bar progress-bar-danger" style="width: 10%">
                                            <span class="sr-only">10% Complete (danger)</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h4 class="title">Sliders</h4>
                                    <div id="sliderRegular" class="slider-info"></div>
                                    <br>
                                    <div id="sliderDouble" class="slider-success"></div>
                                </div>

                                <div  class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-color-input" class="form-control-label">Color</label>
                                        <input class="form-control" type="color" value="#563d7c" id="example-color-input">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end card -->
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script type="text/javascript">
        $(document).ready(function() {
            // Init Sliders
            demo.initSliders();
        });
    </script>
@endpush