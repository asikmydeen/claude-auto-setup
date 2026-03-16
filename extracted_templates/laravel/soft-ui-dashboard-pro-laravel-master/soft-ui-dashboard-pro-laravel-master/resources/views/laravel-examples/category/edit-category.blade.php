@extends('user_type.auth', ['parentFolder' => 'laravel', 'childFolder' => 'category'])

@section('content')
<main class="main-content mt-1 border-radius-lg">
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-9 mx-auto">
                <div class="card card-body mt-4">
                    <h6 class="mb-0">New Category</h6>
                    <p class="text-sm mb-0">Create new category</p>
                    <hr class="horizontal dark my-3">
                    <form action="/laravel-edit-category/{{$category->id}}" method="POST">
                        @csrf
                        <div>
                            <label for="categoryName" class="form-label">Category Name</label>
                            <div class="">
                                <input type="text" class="form-control " id="categoryName" name="name" onfocus="focused(this)" onfocusout="defocused(this)" value="{{$category->name}}">
                                @error('name')
                                    <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                        <div>
                            <label class="mt-4">Category Description</label>
                            <div class="">
                                <textarea type="text" class="form-control  " name="description" id="categoryDescription">{{$category->description}}</textarea>
                                @error('description')
                                    <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mt-4">
                            <a href="{{ url('laravel-category-management') }}" type="button" name="button" class="btn btn-light m-0">BACK TO LIST</a>
                            <button type="submit" name="button" class="btn bg-gradient-primary m-0 ms-2">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection