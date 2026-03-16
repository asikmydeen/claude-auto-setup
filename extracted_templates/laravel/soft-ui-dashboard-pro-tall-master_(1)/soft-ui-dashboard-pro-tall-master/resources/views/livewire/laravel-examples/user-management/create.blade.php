<div class="w-full max-w-full px-3 lg:flex-0 shrink-0">
    <div class="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border"
        id="basic-info">
        <div class="pt-6 pl-6 pr-6 mb-0 rounded-t-2xl">
            <h5 class="dark:text-white">Add User</h5>
            <p class="dark:text-white">Create a new user</p>
            <div class="my-auto ml-auto lg:mt-0">
                <div class="my-auto ml-auto">
                    <a href="{{ route('user-management') }}"
                        class="float-right inline-block px-8 py-2 m-0 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Back
                        to list</a>
                </div>
            </div>
        </div>

        <div class="flex-auto p-6 pt-0">

            <form wire:submit="store" enctype="multipart/form-data">

                <div class="flex flex-wrap -mx-3">
                    <div class="w-6/12 max-w-full px-3 flex-0">

                        <div class="w-full max-w-full flex">
                            <div
                                class="inline-flex items-center justify-center w-19 elative text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                @if($picture)
                                <img src="{{ $picture->temporaryUrl() }}"
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
                                @this.set('role_id', values);
                            })">
                            <select choice wire:model.live="role_id" x-ref="roles">
                                <option value="">Select Role</option>
                                @foreach($roles as $role)
                                <option value="{{ $role->id}}">{{ $role->name }}</option>
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
                            <input wire:model.blur="name" type="text" placeholder="Enter name"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                required />
                            @error('name')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>
                    </div>
                    <div class="w-6/12 max-w-full px-3 flex-0">

                        <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">
                            Email
                        </label>
                        <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                            <input wire:model.blur="email" type="email" placeholder="Enter email"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                required />
                            @error('email')
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
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                required />
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
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                required />
                        </div>
                    </div>
                    <div class="flex-auto p-4 pt-0">
                        <button type="submit"
                            class="inline-block float-right px-8 py-2 mt-16 mb-0 font-bold text-right text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-neutral bg-gradient-dark-gray leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">Add
                            User</button>
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