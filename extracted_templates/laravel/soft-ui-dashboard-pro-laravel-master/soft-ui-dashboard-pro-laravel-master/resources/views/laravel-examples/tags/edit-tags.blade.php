@extends('user_type.auth', ['parentFolder' => 'laravel', 'childFolder' => 'tags'])

@section('content')
<main class="main-content mt-1 border-radius-lg">
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-9 mx-auto">
                <div class="card card-body mt-4">
                    <h6 class="mb-0">New Tag</h6>
                    <p class="text-sm mb-0">Create new tag</p>
                    <hr class="horizontal dark my-3">

                    <form action="/laravel-edit-tag/{{$tag->id}}" method="POST">
                        @csrf
                        <div>
                            <label for="tagsName" class="form-label">Tag Name</label>
                            <div class="">
                                <input type="text" class="form-control " id="tagName" name="name" onfocus="focused(this)" onfocusout="defocused(this)" value="{{$tag->name}}">
                                @error('name')
                                    <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                        <div>
                            <label class="mt-4">Tag Description</label>
                            <div class="">
                                <input type="color" name="color" id="input-name" class="form-control " placeholder="Color" value="{{$tag->description}}" required="" onfocus="focused(this)" onfocusout="defocused(this)">
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mt-4">
                            <a href="{{ url('laravel-tags-management') }}" type="button" name="button" class="btn btn-light m-0">BACK TO LIST</a>
                            <button type="submit" name="button" class="btn bg-gradient-primary m-0 ms-2">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection