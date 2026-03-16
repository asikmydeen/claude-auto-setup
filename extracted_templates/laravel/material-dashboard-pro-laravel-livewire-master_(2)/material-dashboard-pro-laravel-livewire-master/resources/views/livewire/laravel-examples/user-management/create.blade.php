
        <div class="container-fluid py-4">
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card">
                        <!-- Card header -->
                        <div class="card-header">
                            <h5 class="mb-0">Add User</h5>
                            <p>Create new user</p>
                        </div>
                        <div class="col-12 text-end">
                            <a class="btn bg-gradient-dark mb-0 me-4" href="{{ route('user-management') }}">Back to list</a>
                        </div>
                        <div class="card-body">
                            <form wire:submit="store" class='d-flex flex-column align-items-center' enctype="multipart/form-data">
                                <div class="col-md-6">

                                    <div class="avatar avatar-xl position-relative preview">
                                        @if($picture)
                                        <img src="{{ $picture->temporaryUrl() }}" class="w-100 rounded-circle shadow-sm" alt="Profile Photo">
                                        @else
                                        <img src="{{ asset('assets') }}/img/placeholder.jpg" alt="avatar"
                                            class="w-100 rounded-circle shadow-sm">
                                        @endif
                                        <label for="file-input"
                                            class="btn btn-sm btn-icon-only bg-gradient-light position-absolute bottom-0 end-0 mb-n2 me-n2">
                                            <i class="fa fa-pen top-0" data-bs-toggle="tooltip" data-bs-placement="top"
                                                title="" aria-hidden="true" data-bs-original-title="Select Image"
                                                aria-label="Select Image"></i><span class="sr-only">Select Image</span>
                                        </label>
                                        <input wire:model.live="picture" type="file" id="file-input"
                                            >
                                    </div>
                                    @error('picture')
                                    <p class='text-danger inputerror'>{{ $message }} </p>
                                    @enderror
                                </div>
                                <div class="form-group col-12 col-md-6">

                                    <label for="exampleInputname">Name</label>
                                    <input wire:model.blur="name" type="name" class="form-control border border-2 p-2" id="exampleInputname" placeholder="Enter name"  value='{{ old('name') }}'>
                                    @error('name')
                                    <p class='text-danger inputerror'>{{ $message }} </p>
                                    @enderror
                                </div>
                                <div class="form-group col-12 col-md-6 mt-3">

                                    <label for="exampleInputemail">Email</label>
                                    <input wire:model.blur="email" type="email" class="form-control border border-2 p-2" id="exampleInputemail" placeholder="Enter name" value='{{ old('email') }}'>
                                    @error('email')
                                    <p class='text-danger inputerror'>{{ $message }} </p>
                                    @enderror
                                </div>
                                <div class="form-group col-12 col-md-6 mt-3">

                                    <label for='role_id'>Roles</label>
                                    <select wire:model.blur="role_id" class="form-select border border-2 p-2"
                                        data-style="select-with-transition" title="" data-size="100" id="role">
                                        @foreach ($roles as $role)
                                                <option value="{{ $role->id }}" {{ old('role_id') == $role->id ? 'selected' : ''}}>{{ $role->name }}
                                                </option>
                                        @endforeach
                                    </select>
                                    @error('role_id')
                                    <p class='text-danger inputerror'>{{ $message }} </p>
                                    @enderror
                                </div>
                                <div class="form-group col-12 col-md-6 mt-3">

                                    <label for="examplePassword">Password</label>
                                    <input wire:model.blur="password" type="password" class="form-control border border-2 p-2" id="examplePassword" placeholder="Enter password">
                                    @error('password')
                                    <p class='text-danger inputerror'>{{ $message }} </p>
                                    @enderror
                                </div>
                                <div class="form-group col-12 col-md-6 mt-3">
                                    <label for="examplePassword2">Confirm Password</label>
                                    <input wire:model.blur="passwordConfirmation" type="password" name='passwordConfirmation' class="form-control border border-2 p-2" id="examplePassword2" placeholder="Confirm Password">
                                </div>
                                <button type="submit" class="btn btn-dark mt-3">Add user</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @push('js')
    <script src="{{ asset('assets') }}/js/plugins/perfect-scrollbar.min.js"></script>
    @endpush