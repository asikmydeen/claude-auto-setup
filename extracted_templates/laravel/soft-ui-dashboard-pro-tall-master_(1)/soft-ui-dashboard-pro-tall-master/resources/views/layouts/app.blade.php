<x-layouts.base>

    @if (Route::currentRouteName() == 'rtl')
        {{ $slot }}

    @elseif (in_array_r(request()->route()->getName(),getCategoriesArray('guest')))

        @if (in_array(request()->route()->getName(),getCategoriesArray('guest-dark')))
            <div class="container sticky top-0 z-sticky">
                <div class="flex flex-wrap -mx-3">
                    <div class="w-full max-w-full px-3 flex-0">
                        @include('components.navbars.navs.guest')
                    </div>
                </div>
            </div>
        @else
            <div class="flex flex-wrap -mx-3">
                <div class="w-full max-w-full px-3 flex-0">
                    @include('components.navbars.navs.guest')
                </div>
            </div>
        @endif

        {{ $slot }}
        @include('components.footers.guest.footer')

    @else
        @if (in_array(request()->route()->getName(),getCategoriesArray('dashboards', 'virtual-reality')))
            @include('components.navbars.navs.auth')
            <div class="relative mx-4 mt-4 rounded-2xl bg-[url('../img/vr-bg.jpg')] bg-cover">
                @include('components.navbars.sidebar')
                {{ $slot }}
            </div>
            @include('components.footers.auth.footer')
        @else
            @include('components.navbars.sidebar')
            <main class="relative h-full max-h-screen transition-all duration-200 ease-soft-in-out xl:ml-68 rounded-xl">
                @include('components.navbars.navs.auth')
                <div class="w-full p-6 mx-auto">
                    {{ $slot }}
                    @include('components.footers.auth.footer')
                </div>
            </main>
        @endif
        @include('components.fixed-plugin')
    @endif

</x-layouts.base>