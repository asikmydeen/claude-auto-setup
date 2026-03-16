<div class="w-full max-w-full px-3 lg:flex-0 shrink-0">
    <div class="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border"
        id="basic-info">
        <div class="pt-6 pl-6 pr-6 mb-0 rounded-t-2xl">
            <h5 class="dark:text-white">Edit Tag</h5>
            <p class="dark:text-white">Update tag details</p>
            <div class="my-auto ml-auto lg:mt-0">
                <div class="my-auto ml-auto">
                    <a href="{{ route('tag-management') }}"
                        class="float-right inline-block px-8 py-2 m-0 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Back
                        to list</a>
                </div>
            </div>
        </div>

        <div class="flex-auto p-6 pt-0">

            <form wire:submit="update">

                <div class="max-w-full px-3 flex items-center justify-center">

                    <div class="flex flex-wrap mt-4 -mx-3">
                        <div class="w-full max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Tag
                                Name</label>
                            <input wire:model.blur="tag.name" type="text" placeholder="Enter name"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" required />
                            @error('tag.name')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>

                        <div class="w-full max-w-full px-3 mt-4 flex-0">
                            <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Tag
                                Color Picker</label>
                            <input wire:model.blur="tag.color" type="color"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-1 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" required>
                            @error('tag.color')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>
                    </div>

                </div>
                <div class="flex items-center justify-center">
                    <button type="submit"
                        class="px-8 py-2 mt-4 mb-0 font-bold text-white uppercase transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-neutral bg-gradient-dark-gray leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">Save
                        </button>
                </div>
            </form>

        </div>

    </div>

</div>