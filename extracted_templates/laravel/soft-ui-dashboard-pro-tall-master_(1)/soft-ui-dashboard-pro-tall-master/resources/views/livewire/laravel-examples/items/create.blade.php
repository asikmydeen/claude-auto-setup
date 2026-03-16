<div class="w-full max-w-full px-3 lg:flex-0 shrink-0">
    <div class="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border"
        id="basic-info">
        <div class="pt-6 pl-6 pr-6 mb-0 rounded-t-2xl">
            <h5 class="dark:text-white">Add Item</h5>
            <p class="dark:text-white">Create a new item</p>
            <div class="my-auto ml-auto lg:mt-0">
                <div class="my-auto ml-auto">
                    <a href="{{ route('item-management') }}"
                        class="float-right inline-block px-8 py-2 m-0 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Back
                        to list</a>
                </div>
            </div>
        </div>

        <div class="flex-auto pb-4 pt-0">

            <form wire:submit="store" enctype="multipart/form-data">

                <div class="max-w-full px-3 flex items-center justify-center">

                    <div class="flex flex-wrap mt-4 -mx-3 w-full md:w-6/12">

                        <div class="w-full max-w-full flex items-center justify-center">
                            <div
                                class="inline-flex items-center justify-center w-28 relative text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                @if($picture)
                                <img src="{{ $picture->temporaryUrl() }}"
                                    class="w-28 shadow-soft-sm rounded-xl" alt="Item Photo">
                                @else
                                <img src="{{ asset('assets') }}/img/avatar-default.jpg"
                                    class="w-28 shadow-soft-sm rounded-xl">
                                @endif
                                <label for="file-input"
                                    class="inline-block w-6 h-6 p-1.2 right-0 bottom-0 absolute -mb-2 -mr-2 font-bold text-center uppercase align-middle transition-all bg-gradient-gray text-slate-800 border-0 border-transparent border-solid rounded-lg cursor-pointer leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 active:opacity-85">
                                    <i class="top-0 fa fa-pen text-size-3xs"></i>
                                </label>
                                <input wire:model.live='picture' type="file" id="file-input" style="display: none">
                            </div>
                        </div>

                        <div class="w-full max-w-full px-3 flex items-center justify-center pt-6">
                            @error('picture')
                            <p class="block text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>

                        <div class="w-full max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Item
                                Name</label>
                            <input wire:model.blur="name" type="text" placeholder="Enter name"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                required />
                            @error('name')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>

                        <div class="w-full max-w-full px-3 mt-4 flex-0">
                            <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Category
                            </label>

                            <div wire:ignore x-data x-init="
                                    choices = new Choices($refs.category, {
                                        searchEnabled: false
                                    });
                                    $refs.category.addEventListener('change', function (event) {
                                        values = event.detail.value;
                                        @this.set('category_id', values);
                                    })">
                                <select choice wire:model.live="category_id" x-ref="category">
                                    <option value="">Select Category</option>
                                    @foreach($categories as $category)
                                    <option value="{{ $category->id}}">{{ $category->name }}</option>
                                    @endforeach
                                </select>
                            </div>

                            @error('category_id')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>

                        <div class="w-full max-w-full px-3 mt-4 flex-0">
                            <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Item
                                Description</label>
                            <div wire:ignore>
                                <div editor-quill class="!h-1/2" x-data x-ref="quill" x-init="quill = new Quill($refs.quill, {theme: 'snow'});
                            quill.on('text-change', function () {
                                $dispatch('quill-text-change', quill.root.innerHTML);
                            });" x-on:quill-text-change.debounce.2000ms="@this.set('description', $event.detail)">

                                    {!! $description !!}
                                </div>
                            </div>
                            @error('description')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>

                        <div class="w-full max-w-full px-3 mt-4 flex-0">
                            <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Item
                                Tags</label>
                            <div wire:ignore x-data x-init="
                                    choices = new Choices($refs.multiple, {
                                        delimiter: ',',
                                        editItems: true,
                                        removeItemButton: true,
                                        addItems: true
                                    });
                                    $refs.multiple.addEventListener('change', function (event) {
                                        values = []
                                        Array.from($refs.multiple.options).forEach(function (option) {
                                            values.push(option.value || option.text)
                                        })
                                        @this.set('tags_id', values);
                                    })">
                                <select wire:model.live="tags_id" x-ref="multiple" multiple="multiple">
                                    @foreach($tags as $tag)
                                    <option value="{{ $tag->id}}">{{ $tag->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            @error('tags_id')
                            <p class="text-size-sm text-red-500">{{ $message }} </p>
                            @enderror
                        </div>

                        <div class="w-full max-w-full px-3 mt-4 flex-0">
                            <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Item
                                Status</label>
                            <div class="block min-h-6 pl-7-em">

                                <input wire:model.live="status"
                                    class="w-5-em h-5-em ease-soft text-base -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:bg-transparent checked:after:opacity-100 dark:border-white"
                                    type="radio" id="published" value='published' />
                                <label for="published"
                                    class="cursor-pointer select-none font-semibold text-size-xs text-slate-700 dark:text-white/80">Published</label>

                            </div>
                            <div class="block min-h-6 pl-7-em">

                                <input wire:model.live="status"
                                    class="w-5-em h-5-em ease-soft text-base -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:bg-transparent checked:after:opacity-100 dark:border-white"
                                    type="radio" id="draft" value='draft' />
                                <label for="draft"
                                    class="cursor-pointer select-none font-semibold text-size-xs text-slate-700 dark:text-white/80">Draft</label>

                            </div>
                            <div class="block min-h-6 pl-7-em">

                                <input wire:model.live="status"
                                    class="w-5-em h-5-em ease-soft text-base -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:bg-transparent checked:after:opacity-100 dark:border-white"
                                    type="radio" id="archive" value='archive' />
                                <label for="archive"
                                    class="cursor-pointer select-none font-semibold text-size-xs text-slate-700 dark:text-white/80">Archive</label>

                            </div>
                            @error('status')
                            <p class='text-size-sm text-red-500'>{{ $message }} </p>
                            @enderror
                        </div>

                        <div class="w-full max-w-full px-2 mt-4 flex-0">
                            <div class="min-h-6 ml-1 mb-0.5 block pl-12 flex flex-row">
                                <input wire:model.live="showOnHomepage" type="checkbox" value='1'
                                    class="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em mt-0.5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" />
                                <span class="ml-2 font-bold text-size-xs text-slate-700 dark:text-white/80"
                                    style="margin-top: 0.125rem"> Show
                                    on homepage</span>
                            </div>
                        </div>

                        <div class="w-full max-w-full px-3 mt-4 flex-0">
                            <label class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Item
                                Options</label>
                            <div class="block min-h-6 pl-7-em">

                                <input wire:model.live="options"
                                    class="w-5-em h-5-em ease-soft text-base -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:bg-transparent checked:after:opacity-100 dark:border-white"
                                    type="checkbox" id="checkFirst" value='0' />
                                <label for="checkFirst"
                                    class="cursor-pointer select-none font-semibold text-size-xs text-slate-700 dark:text-white/80">First</label>

                            </div>
                            <div class="block min-h-6 pl-7-em">

                                <input wire:model.live="options"
                                    class="w-5-em h-5-em ease-soft text-base -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:bg-transparent checked:after:opacity-100 dark:border-white"
                                    type="checkbox" id="checkSecond" value='1' />
                                <label for="checkSecond"
                                    class="cursor-pointer select-none font-semibold text-size-xs text-slate-700 dark:text-white/80">Second</label>

                            </div>
                            <div class="block min-h-6 pl-7-em">

                                <input wire:model.live="options"
                                    class="w-5-em h-5-em ease-soft text-base -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:bg-transparent checked:after:opacity-100 dark:border-white"
                                    type="checkbox" id="checkThird" value='2' />
                                <label for="checkThird"
                                    class="cursor-pointer select-none font-semibold text-size-xs text-slate-700 dark:text-white/80">Third</label>

                            </div>

                            @error('options')
                            <p class='text-size-sm text-red-500'>{{ $message }} </p>
                            @enderror

                        </div>

                        <div class="w-full max-w-full px-3 mt-4 flex-0">
                            <label
                                class="mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Date</label>

                            <div wire:ignore x-data x-init="
                            flatpickr($refs.picker, {
                                allowInput: true
                            });">
                                <input wire:model.live="date" datetimepicker type="date" x-ref="picker"
                                    class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                    id="exampleDate" placeholder="Please select a date" required>

                            </div>

                            @error('date')
                            <p class='text-size-sm text-red-500'>{{ $message }} </p>
                            @enderror

                        </div>
                        <div class="w-full max-w-full px-3 mt-4 flex item-center justify-center">
                            <button type="submit"
                                class="px-8 py-2 mt-4 mb-0 font-bold text-white uppercase transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-neutral bg-gradient-dark-gray leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">Add
                                Item</button>
                        </div>

                    </div>



            </form>

        </div>

    </div>

</div>
@push('js')
<script src="{{ asset('assets') }}/js/plugins/quill.min.js"></script>
<script src="{{ asset('assets') }}/js/plugins/choices.min.js"></script>
<script src="{{ asset('assets') }}/js/plugins/flatpickr.min.js"></script>
@endpush