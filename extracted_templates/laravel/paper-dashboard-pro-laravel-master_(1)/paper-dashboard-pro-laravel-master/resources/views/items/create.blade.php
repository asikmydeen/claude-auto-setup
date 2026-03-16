@extends('layouts.app', [
    'title' => __('Item Management'),
    'class' => '',
    'folderActive' => 'laravel-examples',
    'elementActive' => 'item'
])

@section('content')
    <div class="content">
        <div class="container-fluid mt--6">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">{{ __('Item Management') }}</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="{{ route('item.index') }}" class="btn btn-sm btn-primary">{{ __('Back to list') }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form method="post" class="item-form" action="{{ route('item.store') }}" autocomplete="off" enctype="multipart/form-data">
                                @csrf

                                <h6 class="heading-small text-muted mb-4">{{ __('Item information') }}</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group{{ $errors->has('name') ? ' has-danger' : '' }}">
                                        <label class="form-control-label" for="input-name">{{ __('Name') }}</label>
                                        <input type="text" name="name" id="input-name" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" placeholder="{{ __('Name') }}" value="{{ old('name') }}" required autofocus>

                                        @include('alerts.feedback', ['field' => 'name'])
                                    </div>
                                    <div class="form-group{{ $errors->has('category_id') ? ' has-danger' : '' }}">
                                        <label class="form-control-label" for="input-category">{{ __('Category') }}</label>
                                        <select name="category_id" id="input-category" class="form-control{{ $errors->has('category_id') ? ' is-invalid' : '' }}" placeholder="{{ __('Category') }}" required>
                                            <option value="">-</option>
                                            @foreach ($categories as $category)
                                                <option value="{{ $category->id }}" {{ $category->id == old('category_id') ? 'selected' : '' }}>{{ $category->name }}</option>
                                            @endforeach
                                        </select>

                                        @include('alerts.feedback', ['field' => 'category_id'])
                                    </div>
                                    <div class="form-group{{ $errors->has('description') ? ' has-danger' : '' }}">
                                        <label class="form-control-label">{{ __('Description') }}</label>
                                        <textarea  class="editor-content" id="editor" name="description">
                                            {!! old('description') !!}
                                           </textarea>
                                        @include('alerts.feedback', ['field' => 'description'])
                                    </div>
                                    <div class="form-group{{ $errors->has('photo') ? ' has-danger' : '' }} d-flex flex-column">
                                        <label class="form-control-label" for="input-name">{{ __('Profile photo') }}</label>
                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail ">
                                                <img src="{{ request()->picture ? request()->picture : asset('img/image_placeholder.jpg') }}" alt="...">
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail"></div>
                                            <div class="custom-file">
                                                <input type="file" name="photo" class="custom-file-input{{ $errors->has('photo') ? ' is-invalid' : '' }}" id="input-picture" accept="image/*" >
                                                <label class="custom-file-label" for="input-picture">{{ request()->picture ? request()->picture : 'Select item picture' }}</label>
                                            </div>
                                            @include('alerts.feedback', ['field' => 'photo'])
                                        </div>
                                    </div>
                                    <div class="form-group{{ $errors->has('tags') ? ' has-danger' : '' }}">
                                        <label class="form-control-label" for="input-tag">{{ __('Tags') }}</label>
                                        <select name="tags[]" id="input-tag" class="form-control select2{{ $errors->has('tags') ? ' is-invalid' : '' }}" placeholder="{{ __('Tags') }}" data-toggle="select" multiple required>
                                            @foreach ($tags as $tag)
                                                <option value="{{ $tag->id }}" {{ in_array($tag->id, old('tags') ?? []) ? 'selected' : '' }}>{{ $tag->name }}</option>
                                            @endforeach
                                        </select>

                                        @include('alerts.feedback', ['field' => 'tags'])
                                    </div>
                                    <div class="form-group{{ $errors->has('status') ? ' has-danger' : '' }}">
                                        <label class="form-control-label" for="input-status">{{ __('Status') }}</label>
                                        @foreach (config('items.statuses') as $value => $status)
                                            <div class="custom-control custom-radio mb-3">
                                                <input name="status" class="custom-control-input" id="{{ $value }}" value="{{ $value }}" type="radio" {{ old('status') == $value ? ' checked' : '' }}>
                                                <label class="custom-control-label" for="{{ $value }}">{{ $status }}</label>
                                            </div>
                                        @endforeach

                                        @include('alerts.feedback', ['field' => 'status'])
                                    </div>
                                    <div class="form-group">
                                        <label class="form-control-label" for="input-show">{{ __('Show on homepage') }}</label>
                                        <div class="custom-field">
                                            <label class="custom-toggle">
                                                <input name="show_on_homepage" type="checkbox" value="1" {{ old('show_on_homepage') == 1 ? ' checked' : '' }}>
                                                <span class="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-control-label">{{ __('Options') }}</label>
                                        @foreach (config('items.options') as $key => $option)
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input class="custom-control-input" name="options[]" id="option-{{ $key }}"
                                                    type="checkbox" value="{{ $key }}" {{ old('options') && in_array($key, old('options')) ? ' checked' : '' }}>
                                                <label class="custom-control-label" for="option-{{ $key }}">
                                                    {{ $option }}
                                                </label>
                                            </div>
                                        @endforeach
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="date">Date</label>
                                                <input class="form-control datepicker" name="date" id="date"
                                                    placeholder="Select date" type="text" data-date-format="DD-MM-YYYY"
                                                    value="{{ old('date', now()->format('d-m-Y')) }}">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="text-center">
                                        <button type="submit" class="btn btn-success mt-4">{{ __('Save') }}</button>
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
@push('scripts')
<script src="https://cdn.ckeditor.com/ckeditor5/19.1.1/classic/ckeditor.js"></script>
<script>
$(document).ready(function () {
    demo.initDateTimePicker();
      ClassicEditor
          .create( document.querySelector( '#editor' ) )
          .then( editor => {
          } )
          .catch( error => {
      } );
      
  });
</script>
@endpush