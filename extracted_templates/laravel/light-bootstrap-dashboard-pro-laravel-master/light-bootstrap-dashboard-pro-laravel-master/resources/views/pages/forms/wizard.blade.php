@extends('layouts.app', ['activePage' => 'wizard', 'activeButton' => 'forms', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Wizard'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto">
                        <form id="wizardForm" method="" action="">
                            <div class="card card-wizard">
                                <div class="card-header ">
                                    <h3 class="card-title text-center">Awesome Wizard</h3>
                                    <p class="card-category text-center">Split a complicated flow in multiple steps</p>
                                </div>
                                <div class="card-body ">
                                    <ul class="nav nav-tabs">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="#tab1" data-toggle="tab" role="tab" aria-controls="tab1" aria-selected="true">First Tab</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#tab2" data-toggle="tab" role="tab" aria-controls="tab2" aria-selected="true">Second Tab</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#tab3" data-toggle="tab" role="tab" aria-controls="tab3" aria-selected="true">Third Tab</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                                            <p class="text-center">Please tell us more about yourself.</p>
                                            <div class="row justify-content-center">
                                                <div class="col-md-5 ">
                                                    <div class="form-group">
                                                        <label class="control-label">First Name</label>
                                                        <input class="form-control" type="text" name="first_name" placeholder="ex: Mike" />
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <div class="form-group">
                                                        <label class="control-label">Last Name</label>
                                                        <input class="form-control" type="text" name="last_name" required="true" placeholder="ex: Andrew" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row justify-content-center">
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="control-label">Email
                                                            <star>*</star>
                                                        </label>
                                                        <input class="form-control" type="text" name="email" email="true" placeholder="ex: hello@creative-tim.com" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="tab2" role="tabpanel">
                                            <h5 class="text-center">Please give us more details about your platform.</h5>
                                            <div class="row justify-content-center">
                                                <div class="col-md-10">
                                                    <div class="form-group">
                                                        <label class="control-label">Your Website
                                                            <star>*</star>
                                                        </label>
                                                        <input class="form-control" type="text" name="website" url="true" placeholder="ex: http://www.creative-tim.com" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row justify-content-center">
                                                <div class="col-md-5">
                                                    <div class="form-group">
                                                        <label class="control-label">Framework Type</label>
                                                        <input class="form-control" type="text" name="framework" placeholder="ex: http://www.creative-tim.com" />
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <div class="form-group">
                                                        <label class="control-label">Language
                                                            <star>*</star>
                                                        </label>
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
                                                </div>
                                            </div>
                                            <div class="row justify-content-center">
                                                <div class="col-md-5">
                                                    <div class="form-group">
                                                        <label class="control-label">Bootstrap Version</label>
                                                        <select name="versions" class="selectpicker" data-title="Single Select" data-style="btn-default btn-outline" data-menu-style="dropdown-blue">
                                                            <option selected="" disabled="">- version -</option>
                                                            <option value="1.1">Bootstrap 1.1</option>
                                                            <option value="2.0">Bootstrap 2.0</option>
                                                            <option value="3.0">Bootstrap 3.0</option>
                                                            <option value="4.0">Bootstrap 4.0(alpha)</option>
                                                            <option value="4.0">Bootstrap 4.0(beta)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <div class="form-group">
                                                        <label class="control-label">Price</label>
                                                        <input class="form-control" type="text" name="price" placeholder="ex: 19.00" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="tab3" role="tabpanel">
                                            <h2 class="text-center text-space">Yuhuuu!
                                                <br>
                                                <small> Click on "
                                                    <b>Finish</b>" to join our community</small>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer text-center">
                                    <button type="button" class="btn btn-default btn-wd btn-back pull-left">Back</button>
                                    <button type="button" class="btn btn-info btn-wd btn-next pull-right">Next</button>
                                    <button type="button" class="btn btn-info btn-wd btn-finish pull-right" onclick="onFinishWizard()">Finish</button>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script type="text/javascript">
        $(document).ready(function() {
            // Init Wizard
            demo.initLBDWizard();
        });
    </script>
@endpush