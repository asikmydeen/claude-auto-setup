<div class="container-fluid py-4">
    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <!-- Card header -->
                <div class="card-header">
                    <h5 class="mb-0">Edit User</h5>
                    <p>Update user details</p>
                    @if (Session::has('demo'))
                <div class="alert alert-danger alert-dismissible text-white" role="alert">
                    <span class="text-sm">{{ Session::get('demo') }}</span>
                    <button type="button" class="btn-close text-lg py-3 opacity-10" data-bs-dismiss="alert"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                @endif
                </div>
                <div class="col-12 text-end">
                    <a class="btn bg-gradient-dark mb-0 me-4" href="{{ route('user-management') }}">Back to list</a>
                </div>
                <div class="card-body">
                    <form wire:submit='update' class='d-flex flex-column align-items-center' enctype="multipart/form-data">
                        <div class="col-md-6">

                            <div class="avatar avatar-xl position-relative preview">
                                @if($picture)
                                <img src="{{ $picture->temporaryUrl() }}" class="w-100 rounded-circle shadow-sm"
                                    alt="Profile Photo">
                                @elseif ($user->picture)
                                <img src="/storage/{{$user->picture}}" alt="avatar"
                                    class="w-100 rounded-circle shadow-sm">
                                @else
                                <img src="{{ asset('assets') }}/img/default-avatar.png" alt="avatar"
                                    class="w-100 rounded-circle shadow-sm">
                                @endif
                                <label for="file-input"
                                    class="btn btn-sm btn-icon-only bg-gradient-light position-absolute bottom-0 end-0 mb-n2 me-n2">
                                    <i class="fa fa-pen top-0" data-bs-toggle="tooltip" data-bs-placement="top" title=""
                                        aria-hidden="true" data-bs-original-title="Select Image"
                                        aria-label="Select Image"></i><span class="sr-only">Select Image</span>
                                </label>
                                <input wire:model.live="picture" type="file" id="file-input">
                            </div>
                            @error('picture')
                            <p class='text-danger inputerror'>{{ $message }} </p>
                            @enderror
                        </div>
                        <div class="form-group col-12 col-md-6">

                            <label for="exampleInputname">Name</label>
                            <input wire:model.blur="user.name" type="name" class="form-control border border-2 p-2"
                                id="exampleInputname" placeholder="Enter name">
                                @error('user.name')
                                <p class='text-danger inputerror'>{{ $message }} </p>
                                @enderror
                        </div>

                        <div class="form-group col-12 col-md-6 mt-3">
                            <label for="exampleInputemail">Email</label>
                            <input type="name" name='user.email' class="form-control border border-2 p-2"
                                id="exampleInputemail" placeholder="Enter name" wire:model.blur="user.email">
                                @error('user.email')
                                <p class='text-danger inputerror'>{{ $message }} </p>
                                @enderror
                        </div>
                        <div class="form-group col-12 col-md-6 mt-3">

                            <label for='role_id'>Roles</label>
                            <select class="form-select border border-2 p-2" wire:model.live="user.role_id"
                                data-style="select-with-transition" title="" data-size="100" id="role">
                                @foreach ($roles as $role)
                                <option value="{{ $role->id }}" {{ $user->role_id === $role->id ? 'selected' : ''}}>
                                    {{ $role->name }}</option>
                                @endforeach
                            </select>
                            @error('user.role_id')
                            <p class='text-danger inputerror'>{{ $message }} </p>
                            @enderror
                        </div>
                        <div class="form-group col-12 col-md-6 mt-3">

                            <label for="examplePassword">Password</label>
                            <input wire:model.blur="password" type="password" class="form-control border border-2 p-2"
                                id="examplePassword" placeholder="Enter password">
                                @error('password')
                                <p class='text-danger inputerror'>{{ $message }} </p>
                                @enderror
                        </div>
                        <div class="form-group col-12 col-md-6 mt-3">
                            <label for="examplePassword2">Confirm Password</label>
                            <input wire:model.blur="confirmPassword" type="password" class="form-control border border-2 p-2"
                                id="examplePassword2" placeholder="Confirm Password">
                        </div>
                        <button type="submit" class="btn btn-dark mt-3">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@push('js')
<script src="{{ asset('assets') }}/js/plugins/perfect-scrollbar.min.js"></script>
@endpush
