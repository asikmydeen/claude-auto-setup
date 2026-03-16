<div class="flex flex-wrap my-6 -mx-3">
    <div class="w-full max-w-full px-3 flex-0">
        <div
            class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">

            <div class="pt-6 pr-6 pl-6 mb-0 rounded-t-2xl">
                <h5 class="dark:text-white">Category Management</h5>
                <p class="dark:text-white"> Here you can manage categories. </p>
                @if (Session::has('status'))
                <div class="fixed bottom-1/100 right-1/100 z-2 mb-16 pb-4 mr-1.25">
                    <div id="alert"
                        class="w-85 text-size-sm shadow-soft-2xl pointer-events-auto max-w-full rounded-lg border-0 bg-white bg-clip-padding p-2 transition-opacity ease-linear">
                        <div class="flex items-center p-3 rounded-t-lg bg-clip-padding text-slate-700">
                            <i class="mr-2 ni ni-check-bold text-lime-500"></i>
                            <span class="mr-auto font-semibold">Soft UI Dashboard</span>
                            <small class="text-slate-500">Now</small>
                            <button type="button" onclick="alertClose()">
                                <i class="ml-4 cursor-pointer fas fa-times"></i>
                            </button>
                        </div>
                        <hr
                            class="h-px m-0 bg-transparent border-0 opacity-25 bg-gradient-horizontal-dark dark:bg-gradient-horizontal-light" />
                        <div class="p-3 break-words">{{ Session::get('status') }}</div>
                    </div>
                </div>
                @elseif (Session::has('error'))
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
            </div>

            @can('create', App\Models\Category::class)
            <div class="my-auto ml-auto pr-6">
                <a href="{{ route('add-category') }}"><button type="button"
                        class="inline-block px-8 py-2 m-0 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">+&nbsp;
                        Add Category</button></a>
            </div>
            @endcan

            <div class="overflow-x-auto">

                <div class="mb-4 flex justify-between pl-6 pr-6 pt-4">

                    <div class="flex flex-row items-center">

                        <p class="text-size-sm mt-3 mr-2">Show</p>
                        <select wire:model.live="perPage"
                            class="text-size-sm focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 leading-5.6 ease-soft block rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            id="entries">
                            <option value="5">5</option>
                            <option selected value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                        <p class="text-size-sm mt-3 ml-2 mr-2">entries</p>

                    </div>
                    <div class="relative flex flex-wrap items-stretch transition-all rounded-lg ease-soft" style="max-height: 40.3693px">
                        <span
                            class="text-size-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                        <input wire:model.live="search" type="text"
                            class="pl-9 text-size-sm focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            placeholder="Search..." />
                    </div>

                </div>

                <table class="items-center w-full mb-4 align-top border-gray-200 text-slate-500 dark:border-white/40">
                    <thead class="align-bottom">
                        <tr>
                            <th wire:click="sortBy('id')" :direction="$sortField === 'id' ? $sortDirection : null" 
                                class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 dark:border-white/40 dark:text-white dark:opacity-80">
                                ID<span><i class="fas fa-sort cursor-pointer ml-1 dark:text-white/80" aria-hidden="true"></i></span>
                            </th>
                            <th wire:click="sortBy('name')" :direction="$sortField === 'name' ? $sortDirection : null" 
                                class="px-6 py-3 pl-2 font-bold text-left uppercase bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 dark:border-white/40 dark:text-white dark:opacity-80">
                                Name<span><i class="fas fa-sort cursor-pointer ml-1 dark:text-white/80" aria-hidden="true"></i></span>
                            </th>
                            <th wire:click="sortBy('description')" :direction="$sortField === 'description' ? $sortDirection : null" 
                                class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 dark:border-white/40 dark:text-white dark:opacity-80">
                                Description<span><i class="fas fa-sort cursor-pointer ml-1 dark:text-white/80" aria-hidden="true"></i></span>
                            </th>

                            <th wire:click="sortBy('created_at')" :direction="$sortField === 'created_at' ? $sortDirection : null" 
                                class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 dark:border-white/40 dark:text-white dark:opacity-80">
                                Creation Date<span><i class="fas fa-sort cursor-pointer ml-1 dark:text-white/80" aria-hidden="true"></i></span>
                            </th>

                            <th
                                class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 dark:border-white/40 dark:text-white dark:opacity-80">
                                @can('manage-items', App\User::class)
                                Action
                                @endcan
                            </th>
                        </tr>
                    </thead>
                    <tbody class="border-t-2 border-current border-solid dark:border-white/40">

                        @foreach ($categories as $category)
                        <tr wire:key="row-{{ $category->id }}">

                            <td
                                class="pl-6 align-middle bg-transparent border-b{{ ($loop->last ? '-0' : '') }} whitespace-nowrap shadow-transparent dark:border-white/40">
                                <p
                                    class="mb-0 font-semibold leading-tight text-size-xs text-slate-400 dark:text-white/80">
                                    {{ $category->id }}</p>
                            </td>

                            <td
                                class="p-2 align-middle bg-transparent border-b{{ ($loop->last ? '-0' : '') }} whitespace-nowrap shadow-transparent dark:border-white/40">
                                <p
                                    class="mb-0 font-semibold leading-tight text-size-xs text-slate-400 dark:text-white/80">
                                    {{ $category->name }}</p>
                            </td>

                            <td
                                class="pl-6 align-middle bg-transparent border-b{{ ($loop->last ? '-0' : '') }} whitespace-nowrap shadow-transparent dark:border-white/40">
                                <p
                                    class="mb-0 font-semibold leading-tight text-size-xs text-slate-400 dark:text-white/80">
                                    {{ $category->description }}</p>
                            </td>

                            <td
                                class="p-2 text-center align-middle bg-transparent border-b{{ ($loop->last ? '-0' : '') }} whitespace-nowrap shadow-transparent dark:border-white/40">
                                <p
                                    class="mb-0 font-semibold leading-tight text-size-xs text-slate-400 dark:text-white/80">
                                    {{ $category->created_at }}</p>
                            </td>

                            <td
                                class="p-2 text-center align-middle bg-transparent border-b{{ ($loop->last ? '-0' : '') }} whitespace-nowrap shadow-transparent dark:border-white/40">
                                <p class="mb-0 font-semibold leading-tight text-base">

                                    @can('manage-items', auth()->user())
                                        @can('update', $category)
                                            <a rel="tooltip" href="{{ route('edit-category', $category)}}">
                                                <i class="fas fa-user-edit dark:text-white/80"></i>
                                            </a>
                                        @endcan
                                        @can('delete', $category)
                                            <button type="button"
                                                onclick="confirm('Are you sure you want to delete this category?') || event.stopImmediatePropagation()"
                                                wire:click="destroy({{ $category->id }})">
                                                <i class="fas fa-trash dark:text-white/80"></i>
                                            </button>
                                        @endcan
                                    @endcan
                                </p>
                            </td>

                        </tr>
                        @endforeach

                    </tbody>

                </table>

                {{ $categories->links('pagination::soft-ui') }}

            </div>
        </div>
    </div>
</div>

@push('js')
<script>
    function alertClose() {
        document.getElementById("alert").style.display = "none";
    }
</script>
@endpush