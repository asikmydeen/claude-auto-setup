<div class="w-full max-w-full px-3 lg:flex-0 shrink-0">
    <div class="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border"
        id="basic-info">
        <div class="pt-6 pl-6 pr-6 mb-0 rounded-t-2xl">
            <h5 class="dark:text-white">Edit User</h5>
            <p class="dark:text-white">Update user details</p>
            <div class="my-auto ml-auto lg:mt-0">
                <div class="my-auto ml-auto">
                    <a href="{{ route('user-management') }}"
                        class="float-right inline-block px-8 py-2 m-0 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Back
                        to list</a>
                </div>
            </div>
        </div>

        @if (Session::has('error'))
        <div class="fixed bottom-1/100 right-1/100 z-2 mb-16 pb-4 mr-1.25">
            <div id="alert"
                class="w-85 text-size-sm shadow-soft-2xl pointer-events-auto max-w-full rounded-lg border-0 bg-white bg-clip-padding p-2 transition-opacity ease-linear">
                <div class="flex items-center p-3 rounded-t-lg bg-clip-padding text-slate-700">
                    <i class="mr-2 text-transparent ni ni-notification-70 bg-gradient-red bg-clip-text"></i>
                    <span class="mr-auto font-semibold text-transparent bg-gradient-red bg-clip-text">Soft UI
                        Dashboard</span>
                    <small class="text-slate-500">Now</small>
                    <button type="button" onclick="alertClose()">
                        <i class="ml-4 cursor-pointer fas fa-times"></i>
                    </button>
                </div>
                <hr
                    class="h-px m-0 bg-transparent border-0 opacity-25 bg-gradient-horizontal-dark dark:bg-gradient-horizontal-light" />
                <div class="p-3 break-words">{{ Session::get('error') }}</div>
            </div>
        </div>
        @endif

        @if (Session::has('demo'))
        <div class="fixed bottom-1/100 right-1/100 z-2 mb-16 pb-4 mr-1.25">
            <div id="alert"
                class="w-85 text-size-sm bg-gradient-cyan shadow-soft-2xl pointer-events-auto mt-2 max-w-full rounded-lg border-0 bg-clip-padding p-2 transition-opacity ease-linear">
                <div class="flex items-center p-3 text-white rounded-t-lg bg-clip-padding">
                    <i class="mr-2 text-white ni ni-bell-55"></i>
                    <span class="mr-auto font-semibold text-white">Soft UI Dashboard</span>
                    <small class="text-white">Now</small>
                    <button type="button" onclick="alertClose()">
                        <i class="ml-4 text-white cursor-pointer fas fa-times"></i>
                    </button>
                </div>
                <hr
                    class="h-px m-0 bg-transparent border-0 opacity-25 bg-gradient-horizontal-light dark:bg-gradient-horizontal-light" />
                <div class="p-3 text-white break-words">{{ Session::get('demo') }}</div>
            </div>
        </div>
        @endif

        <div class="flex-auto p-6 pt-0">

            <form wire:submit="update" enctype="multipart/form-data">

                <div class="flex flex-wrap -mx-3">
                    <div class="w-6/12 max-w-full px-3 flex-0">

                        <div class="w-full max-w-full flex">
                            <div
                                class="inline-flex items-center justify-center w-19 relative text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                @if($picture)
                                <img src="{{ $picture->temporaryUrl() }}"
                                    class="w-19 shadow-soft-sm rounded-xl" alt="Profile Photo">
                                @elseif ($user->picture)
                                <img src="/storage/{{$user->picture}}"
                                    class="w-19 shadow-soft-sm rounded-xl" alt="Profile Photo">
                                @else
                                <img src="{{ asset('assets') }}/img/avatar-default.jpg"
                                    class="w-19 shadow-soft-sm rounded-xl">
                                @endif
                                <label for="file-input"
                                    class="inline-block w-6 h-6 p-1.2 right-0 bottom-0 absolute -mb-2 -mr-2 font-bold text-center uppercase align-middle transition-all bg-gradient-gray text-slate-800 border-0 border-transparent border-solid rounded-lg cursor-pointer leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 active:opacity-85">
                                    <i class="top-0 fa fa-pen text-size-3xs"></i>
                                </label>
                                <input wire:model.live='picture' type="file" id="file-input" style="display: none">
                            </div>
                        </div>

                        @error('picture')
                        <p class="text-size-sm text-red-500">{{ $message }} </p>
                        @enderror

                    </div>

                    <div class="w-6/12 max-w-full px-3 flex-0">

                        <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                            for="Name">Role</label>

                        <div wire:ignore x-data x-init="
                                choices = new Choices($refs.roles, {
                                    searchEnabled: false
                                });
                                $refs.roles.addEventListener('change', function (event) {
                                    values = event.detail.value;
                                    @this.set('user.role_id', values);
                                })">
                            <select choice wire:model.live="user.role_id" x-ref="roles">
                                @foreach($roles as $role)
                                <option value="{{ $role->id }}" {{ $user->role_id === $role->id ? 'selected' : ''}}> {{
                                    $role->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        @error('role_id')
                        <p class="text-size-sm text-red-500">{{ $message }} </p>
                        @enderror
                    </div>

                    <div class="w-6/12 max-w-full px-3 flex-0">

                        <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">
                            Full name
                        </label>
                        <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                            <input wire:model.blur="user.name" type="text" placeholder="Enter name"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                required />
                            @error('user.name')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>
                    </div>
                    <div class="w-6/12 max-w-full px-3 flex-0">

                        <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">
                            Email
                        </label>
                        <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                            <input wire:model.blur="user.email" type="email" placeholder="Enter email"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                required />
                            @error('user.email')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>
                    </div>

                    <div class="w-6/12 max-w-full px-3 flex-0">

                        <label class="mt-6 mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">
                            Password
                        </label>
                        <div class="relative flex flex-wrap items-stretch w-full rounded-lg">

                            <input wire:model.blur="password" type="password" placeholder="Enter password"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                            @error('password')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>
                    </div>
                    <div class="w-6/12 max-w-full px-3 flex-0">

                        <label class="mt-6 mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">
                            Confirm Password
                        </label>
                        <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                            <input wire:model.blur="passwordConfirmation" type="password" name="passwordConfirmation"
                                placeholder="Confirm password"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                        </div>
                    </div>
                    <div class="flex-auto p-4 pt-0">
                        <button type="submit"
                            class="inline-block float-right px-8 py-2 mt-16 mb-0 font-bold text-right text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-neutral bg-gradient-dark-gray leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">Save
                            </button>
                    </div>

                </div>

            </form>

        </div>

    </div>

</div>
@push('js')
<script>
    function alertClose() {
        document.getElementById("alert").style.display = "none";
    }
</script>
<script src="{{ asset('assets') }}/js/plugins/choices.min.js"></script>
@endpush