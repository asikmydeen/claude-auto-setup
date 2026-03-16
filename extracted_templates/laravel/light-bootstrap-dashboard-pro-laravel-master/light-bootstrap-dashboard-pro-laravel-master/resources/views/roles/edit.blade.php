@extends('layouts.app', ['activePage' => 'role', 'activeButton' => 'laravel', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Edit Role'])

@section('content')
    <div class="content">
        <div class="col-md-12">
            <div class="card ">
                <div class="card-header ">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">{{ __('Edit Role') }}</h3>
                        </div>
                        <div class="col-4 text-right">
                            <a href="{{ route('role.index') }}" class="btn btn-sm btn-warning">{{ __('Back to list') }}</a>
                        </div>
                    </div>
                </div>
                <div class="card-body ">
                    <form method="post" action="{{ route('role.update', $role->id) }}" >
                        @csrf
                        @method('patch')
                        <fieldset>
                            <div class="form-group">
                                <label class="form-control-label{{ $errors->has('name') ? ' has-danger' : '' }}">
                                    {{ __('Name') }}</label>
                                <input type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" maxlength="30" value="{{ old('name', $role->name) }}" placeholder="{{ __('Name') }}" required autofocus>
                                @include('alerts.feedback', ['field' => 'name'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group">
                                <label class="form-control-label{{ $errors->has('description') ? ' has-danger' : '' }}">{{__('Description')}}</label>
                                <textarea name="description"  class="form-control{{ $errors->has('description') ? ' has-error is-invalid' : '' }}" rows="3" maxlength="300" placeholder="{{ __('Description') }}" required autofocus> {{old('description', $role->description)}}</textarea>
                                <small class="form-text text-muted"></small>
                                @include('alerts.feedback', ['field' => 'description'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-10">
                                        <button type="submit" class="btn btn-warning">{{ __('Save changes') }}</button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection