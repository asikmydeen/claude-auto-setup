@extends('user_type.auth', ['parentFolder' => 'laravel', 'childFolder' => 'roles'])

@section('content')
<main class="main-content mt-1 border-radius-lg">
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-9 mx-auto">
                <div class="card card-body mt-4">
                    <h6 class="mb-0">New Role</h6>
                    <p class="text-sm mb-0">Create new role</p>
                    <hr class="horizontal dark my-3">
                    <form action="/laravel-new-role" method="POST">
                        @csrf
                        <div>
                            <label for="rolesName" class="form-label">Role Name</label>
                            <div class="">
                                <input type="text" class="form-control " value="{{ old('name') }}" id="roleName" name="name" onfocus="focused(this)" onfocusout="defocused(this)">
                                @error('name')
                                    <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                        <div>
                            <label class="mt-4">Role Description</label>
                            <div class="">
                                <textarea type="text" class="form-control  " name="description" id="roleDescription">{{ old('description') }}</textarea>
                                @error('description')
                                    <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mt-4">
                            <a href="{{ url('laravel-roles-management') }}" type="button" name="button" class="btn btn-light m-0">BACK TO LIST</a>
                            <button type="submit" name="button" class="btn bg-gradient-primary m-0 ms-2">CREATE ROLE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection