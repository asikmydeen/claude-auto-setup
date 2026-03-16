<main class="mt-0 transition-all duration-200 ease-soft-in-out">
    <section class="min-h-75-screen ">
        <div class="container">
            <div class="flex flex-wrap justify-center -mx-3">
                <div class="w-full max-w-full px-3 mx-auto shrink-0 md:flex-0 md:w-7/12 lg:w-5/12">
                    <div
                        class="relative z-0 flex flex-col min-w-0 mt-40 mb-6 break-words bg-white border-0 sm:mt-64 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">

                        <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 text-center pt-6 pb-1">

                            @if (Session::has('status'))
                            <div class="fixed bottom-1/100 right-1/100 z-2 mb-4">
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
                            @elseif (Session::has('email'))
                            <div class="fixed bottom-1/100 right-1/100 z-2 mb-4">
                                <div id="alert"
                                    class="w-85 text-size-sm shadow-soft-2xl pointer-events-auto max-w-full rounded-lg border-0 bg-white bg-clip-padding p-2 transition-opacity ease-linear">
                                    <div class="flex items-center p-3 rounded-t-lg bg-clip-padding text-slate-700">
                                        <i
                                            class="mr-2 text-transparent ni ni-notification-70 bg-gradient-red bg-clip-text"></i>
                                        <span
                                            class="mr-auto font-semibold text-transparent bg-gradient-red bg-clip-text">Soft
                                            UI
                                            Dashboard</span>
                                        <small class="text-slate-500">Now</small>
                                        <button type="button" onclick="alertClose()">
                                            <i class="ml-4 cursor-pointer fas fa-times"></i>
                                        </button>
                                    </div>
                                    <hr
                                        class="h-px m-0 bg-transparent border-0 opacity-25 bg-gradient-horizontal-dark dark:bg-gradient-horizontal-light" />
                                    <div class="p-3 break-words">{{ Session::get('email') }}</div>
                                </div>
                            </div>
                            @endif
                            @if (Session::has('demo'))
                            <div class="fixed bottom-1/100 right-1/100 z-2 mb-4">
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

                            <h4 class="mb-1 font-bold">Reset password</h4>
                            <p class="mb-0">You will receive an e-mail in maximum 60 seconds</p>
                        </div>

                        <div class="flex-auto p-6 text-center">

                            <form wire:submit="recoverPassword" role="form">

                                <div class="mb-4">
                                    <input wire:model.blur="email" type="email" id="email"
                                        class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                        placeholder="Email" name="email" aria-label="Email"
                                        aria-describedby="email-addon" required />
                                    @error('email')
                                    <p class="text-size-sm text-red-500">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="text-center">
                                    <button type="submit"
                                        class="inline-block px-16 py-3.5 mb-0 mt-4 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-neutral bg-gradient-dark-gray leading-pro text-size-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">Send</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
</main>

@push('js')
<script>
    function alertClose() {
        document.getElementById("alert").style.display = "none";
    }
</script>
@endpush