@extends('layouts.app', ['activePage' => 'regular-forms', 'activeButton' => 'forms', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Regular Forms'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="card stacked-form">
                        <div class="card-header ">
                            <h4 class="card-title">Stacked Form</h4>
                        </div>
                        <div class="card-body ">
                            <form method="#" action="#">
                                <div class="form-group">
                                    <label>Email address</label>
                                    <input type="email" placeholder="Enter email" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="Password" class="form-control">
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value="">
                                            <span class="form-check-sign"></span>
                                            Subscribe to newsletter
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer ">
                            <button type="submit" class="btn btn-fill btn-info">Submit</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card horizontal-form">
                        <div class="card-header ">
                            <h4 class="card-title">Horizontal Form</h4>
                        </div>
                        <div class="card-body ">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-md-3 control-label">Email</label>
                                        <div class="col-md-9">
                                            <input type="email" placeholder="Email" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-md-3 control-label">Password</label>
                                        <div class="col-md-9">
                                            <input type="password" placeholder="Password" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <label class="col-md-3"></label>
                                        <div class="col-md-9">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value="">
                                                    <span class="form-check-sign"></span>
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer ">
                            <div class="col-md-9">
                                <button type="submit" class="btn btn-fill btn-info">Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card ">
                        <div class="card-header ">
                            <h4 class="card-title">Form Elements</h4>
                        </div>
                        <div class="card-body ">
                            <form method="get" action="/" class="form-horizontal">
                                <fieldset>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-2 control-label">With help</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control">
                                                <small class="form-text text-muted">A block of help text that breaks onto a new line.</small>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-2 control-label">Password</label>
                                            <div class="col-sm-10">
                                                <input type="password" name="password" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-2 control-label">Placeholder</label>
                                            <div class="col-sm-10">
                                                <input type="text" placeholder="placeholder" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-2 control-label">Disabled</label>
                                            <div class="col-sm-10">
                                                <input type="text" placeholder="Disabled input here..." disabled="" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-2 control-label">Static control</label>
                                            <div class="col-sm-10">
                                                <p class="form-control-static">hello@creative-tim.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-2 control-label">Checkboxes and radios</label>
                                            <div class="col-sm-10">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        <span class="form-check-sign"></span>
                                                        First Checkbox
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        <span class="form-check-sign"></span>
                                                        Second Checkbox
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-radio">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="radio" name="exampleRadio" id="exampleRadios1" value="option1">
                                                        <span class="form-check-sign"></span>
                                                        Radio is off
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-radio">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="radio" name="exampleRadio" id="exampleRadios2" value="option2" checked>
                                                        <span class="form-check-sign"></span>
                                                        Radio is on
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-2 control-label">Inline checkboxes</label>
                                            <div class="col-sm-10">
                                                <div class="form-check checkbox-inline">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="option1">
                                                        <span class="form-check-sign"></span>
                                                        a
                                                    </label>
                                                </div>
                                                <div class="form-check checkbox-inline">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="option2">
                                                        <span class="form-check-sign"></span>
                                                        b
                                                    </label>
                                                </div>
                                                <div class="form-check checkbox-inline">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="option3">
                                                        <span class="form-check-sign"></span>
                                                        c
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card ">
                        <div class="card-header ">
                            <h4 class="card-title">Input Variants</h4>
                        </div>
                        <div class="card-body ">
                            <form method="get" action="/" class="form-horizontal">
                                <div class="row">
                                    <label class="col-sm-2 control-label">Custom Checkboxes &amp; radios</label>
                                    <div class="col-sm-4 col-sm-offset-1 checkbox-radios">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="checkbox">
                                                <span class="form-check-sign"></span>
                                                Unchecked
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="checkbox" checked>
                                                <span class="form-check-sign"></span>
                                                Checked
                                            </label>
                                        </div>
                                        <div class="form-check disabled">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="checkbox" disabled>
                                                <span class="form-check-sign"></span>
                                                Disabled Unchecked
                                            </label>
                                        </div>
                                        <div class="form-check disabled">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="checkbox" disabled>
                                                <span class="form-check-sign"></span>
                                                Disabled Checked
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-5 checkbox-radios">
                                        <div class="form-check form-check-radio">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="exampleRadio" id="exampleRadios1" value="option1">
                                                <span class="form-check-sign"></span>
                                                Radio is off
                                            </label>
                                        </div>
                                        <div class="form-check form-check-radio">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="exampleRadio" id="exampleRadios2" value="option2" checked>
                                                <span class="form-check-sign"></span>
                                                Radio is on
                                            </label>
                                        </div>
                                        <div class="form-check form-check-radio disabled">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="exampleRadio1" id="exampleRadios1" value="option1" disabled>
                                                <span class="form-check-sign"></span>
                                                Radio disabled is off
                                            </label>
                                        </div>
                                        <div class="form-check form-check-radio disabled">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="exampleRadio1" id="exampleRadios2" value="option2" checked disabled>
                                                <span class="form-check-sign"></span>
                                                Radio disabled is on
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label">Input with success</label>
                                    <div class="col-sm-10">
                                        <div class="form-group has-success">
                                            <input type="text" class="form-control" value="Success">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label">Input with error</label>
                                    <div class="col-sm-10">
                                        <div class="form-group has-error">
                                            <input type="text" class="form-control" value="Error">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label">Column sizing</label>
                                    <div class="col-sm-10">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder=".col-md-3">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder=".col-md-4">
                                                </div>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder=".col-md-5">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection