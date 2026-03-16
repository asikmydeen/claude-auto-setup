@extends('layouts.app', ['activePage' => 'item', 'activeButton' => 'laravel', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Create Item' ])

@section('content')
    <div class="content">
        <div class="col-md-12">
            <div class="card ">
                <div class="card-header ">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">{{ __('Create Item') }}</h3>
                        </div>
                        <div class="col-4 text-right">
                            <a href="{{ route('item.index') }}" class="btn btn-sm btn-warning">{{ __('Back to list') }}</a>
                        </div>
                    </div>
                </div>
                <div class="card-body ">
                    <form method="post" action="{{ route('item.store') }}" enctype="multipart/form-data">
                        @csrf
                        <h6 class="heading-small text-muted mb-4">{{ __('Item informations') }}</h6>
                        <fieldset>
                            <div class="form-group">
                                <label class="form-control-label{{ $errors->has('name') ? ' has-danger' : '' }}">
                                    {{ __('Name') }}</label>
                                <input type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" maxlength="30" value="{{ old('name') }}" placeholder="{{ __('Name') }}" required autofocus>
                                @include('alerts.feedback', ['field' => 'name'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group">
                                <label class="form-control-label{{ $errors->has('description') ? ' has-danger' : '' }}">
                                    {{ __('Description') }}</label>
                                    <textarea  class="editor-content" id="editor" name="description">
                                        {!! old('description') !!}
                                    </textarea>

                                @include('alerts.feedback', ['field' => 'description'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group">
                                <label class="form-control-label{{ $errors->has('excerpt') ? ' has-danger' : '' }}">
                                    {{ __('Excerpt') }}</label>
                                <textarea name="excerpt"  class="form-control{{ $errors->has('excerpt') ? ' is-invalid' : '' }}" rows="5" style="height:auto" maxlength="100" placeholder="Excerpt" required autofocus>{{ old('excerpt') }}</textarea> 

                                @include('alerts.feedback', ['field' => 'excerpt'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group{{ $errors->has('photo') ? ' has-danger' : '' }}">
                                <label class="form-control-label" for="photo">{{ __('Profile photo') }}</label> <br>
                                <div class="custom-file">
                                    <input type="file" name="photo" class="form-control-file {{ $errors->has('photo') ? ' is-invalid' : '' }}" id="photo" >
                                </div>

                                @include('alerts.feedback', ['field' => 'photo'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group{{ $errors->has('category_id') ? ' has-danger' : '' }}">
                                <label class="form-control-label">{{ __('Category') }}</label>
                                <select name="category_id" class="selectpicker " data-title="Category" data-style="btn-default btn-outline" data-menu-style="dropdown-blue" required autofocus>
                                    @foreach ($categories as $category)
                                        <option value="{{ $category->id }}" @if (old('category_id') == $category->id) selected @endif> {{ $category->name }} </option>
                                    @endforeach
                                    
                                </select>

                                @include('alerts.feedback', ['field' => 'category_id'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group{{ $errors->has('tag') ? ' has-danger' : '' }}">
                                <label class="form-control-label">{{ __('Tag') }}</label>
                                <select multiple name="tags[]" class="selectpicker " data-title="Tag" data-style="btn-default btn-outline" data-menu-style="dropdown-blue"   autofocus>
                                    @foreach ($tags as $tag)
                                        <option value="{{ $tag->id }}" @if ( old('tags') &&  in_array($tag->id, old('tags'))) selected @endif> {{ $tag->name }} 
                                        </option>
                                    @endforeach
                                </select>
                                @include('alerts.feedback', ['field' => 'tags'])
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group {{ $errors->has('status') ? ' has-danger' : '' }}">
                                <label class="form-control-label">{{ __('Status') }}</label>
                                <div class="form-check form-check-radio">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" id="published" value="published" {{ old('status') == 'published' ? ' checked' : '' }}>
                                        <span class="form-check-sign"></span>
                                        {{ __('Published') }}
                                    </label>
                                </div>
                                <div class="form-check form-check-radio">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" id="draft" value="draft" {{ old('status') == 'draft' ? ' checked' : '' }}>
                                        <span class="form-check-sign"></span>
                                        {{ __('Draft') }}
                                    </label>
                                </div>
                                <div class="form-check form-check-radio">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" id="archive" value="archive" {{ old('status') == 'archive' ? ' checked' : '' }}>
                                        <span class="form-check-sign"></span>
                                        {{ __('Archive') }}
                                    </label>
                                </div>
                                @include('alerts.feedback', ['field' => 'status'])
                            </div>
                        </fieldset>
                        <fieldset >
                            <div class="form-group">
                                <p class="category">{{ __('Show on Homepage') }}</p>
                                <input type="checkbox" checked="false" class="form-control" name="show_on_homepage" {{ old('show_on_homepage') == 1 ? ' checked' : '' }} data-toggle="switch" data-on-color="info" data-off-color="info">
                                <span class="toggle"></span>
                                @include('alerts.feedback', ['field' => 'show_on_homepage'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group">
                                <label class="form-control-label">{{ __('Options') }}</label>
                                <div class="form-check ">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" name="options[]" id="option-1"  value="0" {{ old('options') && in_array(0, old('options')) ? ' checked' : '' }}>
                                        <span class="form-check-sign"></span>
                                        {{ __('First') }}
                                    </label>
                                </div>
                                <div class="form-check ">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" name="options[]" id="option-2" value="1" {{ old('options') && in_array (1, old('options')) ? ' checked' : '' }}>
                                        <span class="form-check-sign"></span>
                                        {{ __('Second') }}
                                    </label>
                                </div>
                                <div class="form-check ">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" name="options[]" id="option-3" value="2" {{ old('options') && in_array (2, old('options')) ? ' checked' : '' }}>
                                        <span class="form-check-sign"></span>
                                        {{ __('Last') }}
                                    </label>
                                </div>
                                @include('alerts.feedback', ['field' => 'options'])
                            </div>
                        </fieldset>
                        <fieldset >
                            <div class="form-group{{ $errors->has('date') ? ' has-danger' : '' }}">
                                <label class="form-control-label">{{ __('Date Picker') }}</label> 
                                <input type="text" class="form-control datepicker{{ $errors->has('date') ? ' is-invalid' : '' }}" name="date" placeholder="Date Picker Here" value="{{ old('date') }}"/>
                                @include('alerts.feedback', ['field' => 'date'])
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-10">
                                        <button type="submit" class="btn btn-warning">{{ __('Create item') }}</button>
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

@push('js')
    <script src="https://cdn.ckeditor.com/ckeditor5/19.1.1/classic/ckeditor.js"></script>
    <script>
    $(document).ready(function () {
        ClassicEditor
            .create( document.querySelector( '#editor' ) )
            .then( editor => {
            } )
            .catch( error => {
        } );
        
    });
    </script>
    <script type="text/javascript">
        $(document).ready(function() {
            // Init Sliders
            $('.datepicker').datetimepicker({
                format: 'DD-MM-YYYY',
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-screenshot',
                    clear: 'fa fa-trash',
                    close: 'fa fa-remove'
                }
            });
        });
    </script>
@endpush