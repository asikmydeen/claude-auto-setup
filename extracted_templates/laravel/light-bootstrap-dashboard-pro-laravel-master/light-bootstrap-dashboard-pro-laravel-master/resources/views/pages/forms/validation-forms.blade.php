@extends('layouts.app', ['activePage' => 'validation-forms', 'activeButton' => 'forms', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Validation Forms'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <form id="RegisterValidation" action="" method="">
                            <div class="card ">
                                <div class="card-header ">
                                    <h4 class="card-title">Register Form</h4>
                                </div>
                                <div class="card-body ">
                                    <div class="form-group has-label">
                                        <label>
                                            Email Address
                                            <star class="star">*</star>
                                        </label>
                                        <input class="form-control" name="email" type="email" required="true" />
                                    </div>
                                    <div class="form-group has-label">
                                        <label>
                                            Password
                                            <star class="star">*</star>
                                        </label>
                                        <input class="form-control" name="password" id="registerPassword" type="password" required="true" />
                                    </div>
                                    <div class="form-group has-label">
                                        <label>
                                            Confirm Password
                                            <star class="star">*</star>
                                        </label>
                                        <input class="form-control" name="password_confirmation" id="registerPasswordConfirmation" type="password" required="true" equalTo="#registerPassword" />
                                    </div>
                                    <div class="card-category form-category">
                                        <star class="star">*</star> Required fields</div>
                                </div>
                                <div class="card-footer text-right">
                                    <button type="submit" class="btn btn-info btn-fill pull-right">Register</button>
                                    <div class="form-group pull-left">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="checkbox" value="">
                                                <span class="form-check-sign"></span>
                                                Subscribe to newsletter
                                            </label>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <form id="LoginValidation" action="" method="">
                            <div class="card ">
                                <div class="card-header ">
                                    <h4 class="card-title text-center">Login Form</h4>
                                </div>
                                <div class="card-body ">
                                    <div class="form-group has-label">
                                        <label>Email Address
                                            <star class="star">*</star>
                                        </label>
                                        <input class="form-control" name="email" type="text" email="true" required="true" />
                                    </div>
                                    <div class="form-group has-label">
                                        <label>Password
                                            <star class="star">*</star>
                                        </label>
                                        <input class="form-control" name="password" type="password" required="true" />
                                    </div>
                                    <div class="card-category form-category">
                                        <star class="star">*</star> Required fields</div>
                                </div>
                                <div class="card-footer text-center">
                                    <button type="submit" class="btn btn-info btn-fill btn-wd">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-12">
                        <form id="TypeValidation" class="form-horizontal" action="" method="">
                            <div class="card ">
                                <div class="card-header ">
                                    <h4 class="card-title">Type Validation</h4>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Required Text</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="required" required="true" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>required</code>
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Email</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="email" email="true" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>email="true"</code>
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Number</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="number" number="true" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>number="true"</code>
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Url</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="url" url="true" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>url="true"</code>
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Equal to</label>
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <input class="form-control" id="idSource" type="text" placeholder="#idSource" />
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <input class="form-control" id="idDestination" type="text" placeholder="#idDestination" equalTo="#idSource" />
                                            </div>
                                        </div>
                                        <label class="col-sm-4 label-on-right">
                                            <code>equalTo="#idSource"</code>
                                        </label>
                                    </div>
                                </div>
                                <div class="card-footer text-center">
                                    <button type="submit" class="btn btn-info">Validate Inputs</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-12">
                        <form id="RangeValidation" class="form-horizontal" action="" method="">
                            <div class="card ">
                                <div class="card-header ">
                                    <h4 class="card-title">Range Validation</h4>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Min Length</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="min_length" minLength="5" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>minLength="5"</code>
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Max Length</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="max_length" maxLength="5" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>maxLength="5"</code>
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Range</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="range" range="[6,10]" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>range="[6,10]"</code>
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Min Value</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="min" min="6" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>min="6"</code>
                                        </label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 col-form-label">Max Value</label>
                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <input class="form-control" type="text" name="max" max="6" />
                                            </div>
                                        </div>
                                        <label class="col-sm-3 label-on-right">
                                            <code>max="6"</code>
                                        </label>
                                    </div>
                                </div>
                                <div class="card-footer text-center">
                                    <button type="submit" class="btn btn-info">Validate Inputs</button>
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
        function setFormValidation(id) {
            $(id).validate({
                highlight: function(element) {
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                    $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
                },
                success: function(element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                    $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
                },
                errorPlacement: function(error, element) {
                    $(element).closest('.form-group').append(error).addClass('has-error');
                },
            });
        }

        $(document).ready(function() {
            setFormValidation('#RegisterValidation');
            setFormValidation('#TypeValidation');
            setFormValidation('#LoginValidation');
            setFormValidation('#RangeValidation');
        });
    </script>
@endpush