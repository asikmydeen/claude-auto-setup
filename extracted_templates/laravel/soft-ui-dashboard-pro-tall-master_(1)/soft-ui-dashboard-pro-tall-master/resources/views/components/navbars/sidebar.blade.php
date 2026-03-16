<!-- sidenav  -->
@if (in_array(request()->route()->getName(),getCategoriesArray('dashboards', 'virtual-reality')))
<aside mini="false"
  class="dark:bg-gray-950 xl:animate-fade-up xl:scale-60 ease-soft-in-out z-990 max-w-64 xl:shadow-soft-xl fixed inset-y-0 left-0 xl:ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-none transition-all duration-200 xl:left-[18%] xl:mt-6 xl:translate-x-0 xl:bg-white"
  id="sidenav-main">
  @else
  <aside mini="false"
    class="fixed inset-y-0 left-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto transition-all duration-200 -translate-x-full bg-white border-0 shadow-none xl:ml-4 dark:bg-gray-950 ease-soft-in-out z-990 max-w-64 rounded-2xl xl:translate-x-0 xl:bg-transparent"
    id="sidenav-main">

    @endif
    <!-- header -->

    <div class="h-20">
      <!-- x i -->
      <i class="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 dark:text-white xl:hidden"
        aria-hidden="true" sidenav-close-btn></i>

      <a class="block px-8 py-6 m-0 text-size-sm whitespace-nowrap text-slate-700 dark:text-white"
        href="{{ env('APP_URL') }}">
        {{-- target="_blank" --}}
        <img src="{{ asset('assets') }}/img/logo-ct-dark.png"
          class="inline-block h-full max-w-full transition-all duration-200 ease-soft-in-out max-h-8 dark:hidden"
          alt="main_logo" />
        <img src="{{ asset('assets') }}/img/logo-ct.png"
          class="hidden h-full max-w-full transition-all duration-200 ease-soft-in-out max-h-8 dark:inline-block"
          alt="main_logo" />

        <span class="ml-1 font-semibold transition-all duration-200 ease-soft-in-out">Soft UI Dashboard PRO</span>
      </a>
    </div>

    <!-- //---------hr----------// -->

    <hr class="h-px mt-0 bg-transparent bg-gradient-horizontal-dark dark:bg-gradient-horizontal-light" />

    <div class="items-center block w-full h-auto grow basis-full" id="sidenav-collapse-main">
      <!-- primary list  -->

      <ul class="flex flex-col pl-0 mb-0 list-none">
        <!-- primary list item -->

        <li class="mt-0.5 w-full">
          <!-- primary anchor  -->
          <a {{ in_array_r(request()->route()->getName(),getCategoriesArray('dashboards')) ? 'active_primary
            aria-expanded=true' :
            'aria-expanded=false' }} collapse_trigger="primary" href="javascript:;" class="ease-soft-in-out
            text-size-sm
            py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap
            px-4 {{ in_array_r(request()->route()->getName(),getCategoriesArray('dashboards')) ? 'font-semibold
            text-slate-700
            xl:shadow-soft-xl rounded-lg bg-white transition-all after:text-slate-800 after:rotate-180' : 'font-medium
            text-slate-500 shadow-none transition-colors after:text-slate-800/50 dark:after:text-white/50
            dark:after:text-white' }} after:ml-auto after:inline-block after:font-bold after:antialiased
            after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80">

            <!-- big anchor expandable -->
            <div
              class="stroke-none mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black {{ in_array_r(request()->route()->getName(),getCategoriesArray('dashboards')) ? 'shadow-soft-sm bg-gradient-fuchsia' : 'shadow-soft-2xl' }}">

              <!-- icon -->

              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>shop</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-1716.000000, -439.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g transform="translate(0.000000, 148.000000)">
                        <path
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('dashboards')) ? '' : 'fill-slate-800' }}"
                          d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                          opacity="0.598981585"></path>
                        <path
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('dashboards')) ? '' : 'fill-slate-800' }}"
                          d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <!-- primary span -->

            <span
              class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft {{ in_array_r(request()->route()->getName(),getCategoriesArray('dashboards')) ? 'text-slate-700' : '' }}">Dashboards</span>
          </a>

          <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
            id="dashboardsExamples">
            <!-- primary collapsable list -->
            <ul class="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
              <!-- medium list item  -->

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'analytics' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('analytics') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    A
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Default </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'automotive' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('automotive') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    A
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Automotive </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'smart-home' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('smart-home') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    S
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Smart Home </span>
                </a>
              </li>

              <li class="w-full">
                <a {{ in_array(request()->route()->getName(),getCategoriesArray('dashboards', 'virtual-reality')) ?
                  'active_secondary
                  aria-expanded=true' :
                  'aria-expanded=false' }}
                  collapse_trigger="secondary" href="javascript:;" class="after:ease-soft-in-out
                  after:font-awesome-5-free
                  ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center
                  whitespace-nowrap
                  bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2
                  before:-translate-y-1/2
                  before:rounded-3xl before:content-[''] after:ml-auto after:inline-block after:font-bold
                  after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white
                  dark:before:bg-white dark:before:opacity-80 dark:after:text-white {{
                  in_array(request()->route()->getName(),getCategoriesArray('dashboards', 'virtual-reality')) ?
                  'before:-left-5
                  rounded-lg font-semibold text-slate-800 before:bg-slate-800 before:h-2 before:w-2 after:text-slate-800
                  after:rotate-180 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium
                  text-slate-800/50 before:bg-slate-800/50 after:text-slate-800/50 dark:opacity-60
                  dark:after:text-white/50' }}">

                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    P
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Virtual Reality <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="profileExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='vr-default' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'vr-default' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('vr-default') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          V </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> VR Default </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='vr-info' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'vr-info' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('vr-info') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          V </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> VR Info </span>
                      </a>
                    </li>

                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'crm' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('crm') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    C
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> CRM </span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li class="mt-0.5 w-full">
          <!-- primary anchor  -->
          <a {{ in_array_r(request()->route()->getName(),getCategoriesArray('laravel-examples')) ? 'active_primary
            aria-expanded=true'
            :'aria-expanded=false' }}
            collapse_trigger="primary" href="javascript:;" class="ease-soft-in-out text-size-sm py-2.7 active
            after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap px-4
            {{ in_array_r(request()->route()->getName(),getCategoriesArray('laravel-examples')) ? 'font-semibold
            text-slate-700 xl:shadow-soft-xl
            rounded-lg bg-white transition-all after:text-slate-800 after:rotate-180'
            : 'font-medium text-slate-500 shadow-none transition-colors after:text-slate-800/50 dark:after:text-white/50
            dark:after:text-white' }}
            after:ml-auto after:inline-block after:font-bold after:antialiased after:transition-all after:duration-200
            after:content-['\f107'] dark:text-white dark:opacity-80">

            <!-- big anchor expandable -->
            <div
              class="stroke-none mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black {{ in_array_r(request()->route()->getName(),getCategoriesArray('laravel-examples')) ? 'shadow-soft-sm bg-gradient-fuchsia' : 'shadow-soft-2xl' }}">

              <!-- icon -->

              <svg width="12px" height="12px" viewBox="0 0 50 52" xmlns="http://www.w3.org/2000/svg">
                <title>Logomark</title>
                <path
                  class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('laravel-examples')) ? '' : 'fill-slate-800' }}"
                  d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.481L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.096l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z"
                  fill="#FFFFFF" fill-rule="nonzero" />
              </svg>

            </div>

            <!-- primary span -->

            <span
              class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft {{ in_array_r(request()->route()->getName(),getCategoriesArray('laravel-examples')) ? 'text-slate-700' : '' }}">Laravel
              Examples</span>
          </a>

          <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
            id="dashboardsExamples">
            <!-- primary collapsable list -->
            <ul class="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
              <!-- medium list item  -->
              <li class="w-full">
                <!-- medium a -->
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'user-profile' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('user-profile') }}">
                  <!-- mini span -->
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    UP
                  </span>

                  <!-- estended span -->
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> User Profile </span>
                </a>
              </li>

              @can('manage-users', App\Models\User::class)
              <li class="w-full">
                <!-- medium a -->
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ in_array_r(request()->route()->getName(),getCategoriesArray('laravel-examples', 'user')) ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('user-management') }}">
                  <!-- mini span -->
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    UM
                  </span>

                  <!-- estended span -->
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> User Management </span>
                </a>
              </li>

              <li class="w-full">
                <!-- medium a -->
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ in_array(request()->route()->getName(),getCategoriesArray('laravel-examples', 'role')) ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('role-management') }}">
                  <!-- mini span -->
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    RM
                  </span>

                  <!-- estended span -->
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Role Management </span>
                </a>
              </li>
              @endcan

              @can('manage-items', App\Models\User::class)
              <li class="w-full">
                <!-- medium a -->
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ in_array(request()->route()->getName(),getCategoriesArray('laravel-examples', 'category')) ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('category-management') }}">
                  <!-- mini span -->
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    CM
                  </span>

                  <!-- estended span -->
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Category Management </span>
                </a>
              </li>

              <li class="w-full">
                <!-- medium a -->
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ in_array(request()->route()->getName(),getCategoriesArray('laravel-examples', 'tag')) ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('tag-management') }}">
                  <!-- mini span -->
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    TM
                  </span>

                  <!-- estended span -->
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Tag Management </span>
                </a>
              </li>
              @endcan


              <li class="w-full">
                <!-- medium a -->
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ in_array(request()->route()->getName(),getCategoriesArray('laravel-examples', 'item')) ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('item-management') }}">
                  <!-- mini span -->
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    IM
                  </span>
                  @can('manage-items', App\Models\User::class)
                  <!-- estended span -->
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Item Management </span>
                  @else
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Items </span>
                  @endcan
                </a>
              </li>


            </ul>
          </div>
        </li>

        <li class="w-full mt-4">
          <h6 class="pl-6 ml-2 font-bold leading-tight uppercase text-size-xs opacity-60 dark:text-white">PAGES</h6>
        </li>

        <li class="mt-0.5 w-full">

          <a {{ in_array_r(request()->route()->getName(),getCategoriesArray('pages')) ? 'active_primary
            aria-expanded=true' :
            'aria-expanded=false' }} collapse_trigger="primary" href="javascript:;" class="ease-soft-in-out
            text-size-sm
            py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap
            px-4 {{ in_array_r(request()->route()->getName(),getCategoriesArray('pages')) ? 'font-semibold
            text-slate-700
            xl:shadow-soft-xl rounded-lg bg-white transition-all after:text-slate-800 after:rotate-180' : 'font-medium
            text-slate-500 shadow-none transition-colors after:text-slate-800/50 dark:after:text-white/50
            dark:after:text-white' }} after:ml-auto after:inline-block after:font-bold after:antialiased
            after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80">

            <!-- big anchor expandable -->
            <div
              class="stroke-none mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black {{ in_array_r(request()->route()->getName(),getCategoriesArray('pages')) ? 'shadow-soft-sm bg-gradient-fuchsia' : 'shadow-soft-2xl' }}">

              <!-- icon -->

              <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>office</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g id="office" transform="translate(153.000000, 2.000000)">
                        <path
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('pages')) ? '' : 'fill-slate-800' }}"
                          d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                          opacity="0.6"></path>
                        <path
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('pages')) ? '' : 'fill-slate-800' }}"
                          d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <!-- primary span -->

            <span
              class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft {{ in_array_r(request()->route()->getName(),getCategoriesArray('pages')) ? 'text-slate-700' : '' }}">Pages</span>
          </a>

          <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0" id="pagesExamples">
            <ul class="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
              <li class="w-full">
                <a {{ in_array(request()->route()->getName(),getCategoriesArray('pages', 'profile')) ? 'active_secondary
                  aria-expanded=true' :
                  'aria-expanded=false' }}
                  collapse_trigger="secondary" href="javascript:;" class="after:ease-soft-in-out
                  after:font-awesome-5-free
                  ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center
                  whitespace-nowrap
                  bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2
                  before:-translate-y-1/2
                  before:rounded-3xl before:content-[''] after:ml-auto after:inline-block after:font-bold
                  after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white
                  dark:before:bg-white dark:before:opacity-80 dark:after:text-white {{
                  in_array(request()->route()->getName(),getCategoriesArray('pages', 'profile')) ? 'before:-left-5
                  rounded-lg font-semibold text-slate-800 before:bg-slate-800 before:h-2 before:w-2 after:text-slate-800
                  after:rotate-180 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium
                  text-slate-800/50 before:bg-slate-800/50 after:text-slate-800/50 dark:opacity-60
                  dark:after:text-white/50' }}">

                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    P
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Profile <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="profileExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='profile-overview' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'profile-overview' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('profile-overview') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          P </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Profile Overview
                        </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='profile-teams' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'profile-teams' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('profile-teams') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          T </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Teams </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='profile-projects' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'profile-projects' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('profile-projects') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          A </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> All Projects </span>
                      </a>
                    </li>

                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a {{ in_array(request()->route()->getName(),getCategoriesArray('pages', 'users')) ? 'active_secondary
                  aria-expanded=true' :
                  'aria-expanded=false' }}
                  collapse_trigger="secondary" href="javascript:;" class="after:ease-soft-in-out
                  after:font-awesome-5-free
                  ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center
                  whitespace-nowrap
                  bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2
                  before:-translate-y-1/2
                  before:rounded-3xl before:content-[''] after:ml-auto after:inline-block after:font-bold
                  after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white
                  dark:before:bg-white dark:before:opacity-80 dark:after:text-white {{
                  in_array(request()->route()->getName(),getCategoriesArray('pages', 'users')) ? 'before:-left-5
                  rounded-lg font-semibold text-slate-800 before:bg-slate-800 before:h-2 before:w-2 after:text-slate-800
                  after:rotate-180 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium
                  text-slate-800/50 before:bg-slate-800/50 after:text-slate-800/50 dark:opacity-60
                  dark:after:text-white/50' }}">

                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    U
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Users <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="profileExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='reports' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'reports' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('reports') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          R </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Reports
                        </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='new-user' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'new-user' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('new-user') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          N </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> New User </span>
                      </a>
                    </li>

                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a {{ in_array(request()->route()->getName(),getCategoriesArray('pages', 'account')) ? 'active_secondary
                  aria-expanded=true' :
                  'aria-expanded=false' }}
                  collapse_trigger="secondary" href="javascript:;" class="after:ease-soft-in-out
                  after:font-awesome-5-free
                  ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center
                  whitespace-nowrap
                  bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2
                  before:-translate-y-1/2
                  before:rounded-3xl before:content-[''] after:ml-auto after:inline-block after:font-bold
                  after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white
                  dark:before:bg-white dark:before:opacity-80 dark:after:text-white {{
                  in_array(request()->route()->getName(),getCategoriesArray('pages', 'account')) ? 'before:-left-5
                  rounded-lg font-semibold text-slate-800 before:bg-slate-800 before:h-2 before:w-2 after:text-slate-800
                  after:rotate-180 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium
                  text-slate-800/50 before:bg-slate-800/50 after:text-slate-800/50 dark:opacity-60
                  dark:after:text-white/50' }}">

                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    A
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Account <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="profileExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='settings' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'settings' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('settings') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          S </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Settings
                        </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='billing' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'billing' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('billing') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          B </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Billing </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='invoice' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'invoice' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('invoice') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          I </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Invoice </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='security' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'security' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('security') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          S </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Security </span>
                      </a>
                    </li>

                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a {{ in_array(request()->route()->getName(),getCategoriesArray('pages', 'projects')) ?
                  'active_secondary
                  aria-expanded=true' :
                  'aria-expanded=false' }}
                  collapse_trigger="secondary" href="javascript:;" class="after:ease-soft-in-out
                  after:font-awesome-5-free
                  ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center
                  whitespace-nowrap
                  bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2
                  before:-translate-y-1/2
                  before:rounded-3xl before:content-[''] after:ml-auto after:inline-block after:font-bold
                  after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white
                  dark:before:bg-white dark:before:opacity-80 dark:after:text-white {{
                  in_array(request()->route()->getName(),getCategoriesArray('pages', 'projects')) ? 'before:-left-5
                  rounded-lg font-semibold text-slate-800 before:bg-slate-800 before:h-2 before:w-2 after:text-slate-800
                  after:rotate-180 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium
                  text-slate-800/50 before:bg-slate-800/50 after:text-slate-800/50 dark:opacity-60
                  dark:after:text-white/50' }}">

                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    P
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Projects <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="profileExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='general' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'general' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('general') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          G </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> General
                        </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='timeline' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'timeline' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('timeline') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          T </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Timeline </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='new-project' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'new-project' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('new-project') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          N </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> New Project </span>
                      </a>
                    </li>

                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60"
                  href="{{ route('pricing-page') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    P
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Pricing Page </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'messages' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('messages') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    M
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Messages </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60"
                  href="{{ route('rtl') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    R
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> RTL </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'widgets' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('widgets') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    W
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Widgets </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'charts' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('charts') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    C
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Charts </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'sweet-alerts' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('sweet-alerts') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    S
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Sweet Alerts </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'notifications' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('notifications') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    N
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Notifications </span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <!-- Applications -->

        <li class="mt-0.5 w-full">
          <a {{ in_array_r(request()->route()->getName(),getCategoriesArray('applications')) ? 'active_primary
            aria-expanded=true' :
            'aria-expanded=false' }} collapse_trigger="primary" href="javascript:;" class="ease-soft-in-out
            text-size-sm
            py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap
            px-4 {{ in_array_r(request()->route()->getName(),getCategoriesArray('applications')) ? 'font-semibold
            text-slate-700
            xl:shadow-soft-xl rounded-lg bg-white transition-all after:text-slate-800 after:rotate-180' : 'font-medium
            text-slate-500 shadow-none transition-colors after:text-slate-800/50 dark:after:text-white/50
            dark:after:text-white' }} after:ml-auto after:inline-block after:font-bold after:antialiased
            after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80">

            <div
              class="stroke-none mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black {{ in_array_r(request()->route()->getName(),getCategoriesArray('applications')) ? 'shadow-soft-sm bg-gradient-fuchsia' : 'shadow-soft-2xl' }}">

              <svg width="12px" height="12px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>settings</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g transform="translate(304.000000, 151.000000)">
                        <polygon
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('applications')) ? '' : 'fill-slate-800' }}"
                          opacity="0.596981957"
                          points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                        </polygon>
                        <path
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('applications')) ? '' : 'fill-slate-800' }}"
                          d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                          opacity="0.596981957"></path>
                        <path
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('applications')) ? '' : 'fill-slate-800' }}"
                          d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <span
              class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft {{ in_array_r(request()->route()->getName(),getCategoriesArray('applications')) ? 'text-slate-700' : '' }}">Applications</span>
          </a>

          <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
            id="applicationsExamples">
            <ul class="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'kanban' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('kanban') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    K
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Kanban </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'wizard' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('wizard') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    W
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Wizard </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'datatables' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('datatables') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    D
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> DataTables </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'calendar' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('calendar') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    C
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Calendar </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'analytics-page' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('analytics-page') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    A
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Analytics </span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <!-- Ecommerce  -->

        <li class="mt-0.5 w-full">
          <a {{ in_array_r(request()->route()->getName(),getCategoriesArray('ecommerce')) ? 'active_primary
            aria-expanded=true' :
            'aria-expanded=false' }} collapse_trigger="primary" href="javascript:;" class="ease-soft-in-out
            text-size-sm
            py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap
            px-4 {{ in_array_r(request()->route()->getName(),getCategoriesArray('ecommerce')) ? 'font-semibold
            text-slate-700
            xl:shadow-soft-xl rounded-lg bg-white transition-all after:text-slate-800 after:rotate-180' : 'font-medium
            text-slate-500 shadow-none transition-colors after:text-slate-800/50 dark:after:text-white/50
            dark:after:text-white' }} after:ml-auto after:inline-block after:font-bold after:antialiased
            after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80">

            <!-- big anchor expandable -->
            <div
              class="stroke-none mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black {{ in_array_r(request()->route()->getName(),getCategoriesArray('ecommerce')) ? 'shadow-soft-sm bg-gradient-fuchsia' : 'shadow-soft-2xl' }}">

              <!-- icon -->

              <svg class="text-dark" width="12px" height="12px" viewBox="0 0 42 44" version="1.1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>basket</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-1869.000000, -741.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g id="basket" transform="translate(153.000000, 450.000000)">
                        <path
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('ecommerce')) ? '' : 'fill-slate-800' }}"
                          d="M34.080375,13.125 L27.3748125,1.9490625 C27.1377583,1.53795093 26.6972449,1.28682264 26.222716,1.29218729 C25.748187,1.29772591 25.3135593,1.55890827 25.0860125,1.97535742 C24.8584658,2.39180657 24.8734447,2.89865282 25.1251875,3.3009375 L31.019625,13.125 L10.980375,13.125 L16.8748125,3.3009375 C17.1265553,2.89865282 17.1415342,2.39180657 16.9139875,1.97535742 C16.6864407,1.55890827 16.251813,1.29772591 15.777284,1.29218729 C15.3027551,1.28682264 14.8622417,1.53795093 14.6251875,1.9490625 L7.919625,13.125 L0,13.125 L0,18.375 L42,18.375 L42,13.125 L34.080375,13.125 Z"
                          opacity="0.595377604"></path>
                        <path
                          class="{{ in_array_r(request()->route()->getName(),getCategoriesArray('ecommerce')) ? '' : 'fill-slate-800' }}"
                          d="M3.9375,21 L3.9375,38.0625 C3.9375,40.9619949 6.28800506,43.3125 9.1875,43.3125 L32.8125,43.3125 C35.7119949,43.3125 38.0625,40.9619949 38.0625,38.0625 L38.0625,21 L3.9375,21 Z M14.4375,36.75 L11.8125,36.75 L11.8125,26.25 L14.4375,26.25 L14.4375,36.75 Z M22.3125,36.75 L19.6875,36.75 L19.6875,26.25 L22.3125,26.25 L22.3125,36.75 Z M30.1875,36.75 L27.5625,36.75 L27.5625,26.25 L30.1875,26.25 L30.1875,36.75 Z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <!-- primary span -->

            <span
              class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft {{ in_array_r(request()->route()->getName(),getCategoriesArray('ecommerce')) ? 'text-slate-700' : '' }}">Ecommerce</span>
          </a>

          <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
            id="ecommerceExamples">
            <ul class="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'overview' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('overview') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    O
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Overview </span>
                </a>
              </li>

              <li class="w-full">
                <a {{ in_array(request()->route()->getName(),getCategoriesArray('ecommerce', 'products')) ?
                  'active_secondary
                  aria-expanded=true' :
                  'aria-expanded=false' }}
                  collapse_trigger="secondary" href="javascript:;" class="after:ease-soft-in-out
                  after:font-awesome-5-free
                  ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center
                  whitespace-nowrap
                  bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2
                  before:-translate-y-1/2
                  before:rounded-3xl before:content-[''] after:ml-auto after:inline-block after:font-bold
                  after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white
                  dark:before:bg-white dark:before:opacity-80 dark:after:text-white {{
                  in_array(request()->route()->getName(),getCategoriesArray('ecommerce', 'products')) ? 'before:-left-5
                  rounded-lg font-semibold text-slate-800 before:bg-slate-800 before:h-2 before:w-2 after:text-slate-800
                  after:rotate-180 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium
                  text-slate-800/50 before:bg-slate-800/50 after:text-slate-800/50 dark:opacity-60
                  dark:after:text-white/50' }}">

                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    P
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Products <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="profileExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='new-product' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'new-product' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('new-product') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          N </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> New Product
                        </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='edit-product' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'edit-product' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('edit-product') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          E </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Edit Product </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='product-page' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'product-page' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('product-page') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          P </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Product Page </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='products-list' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'products-list' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('products-list') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          P </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Products List </span>
                      </a>
                    </li>

                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a {{ in_array(request()->route()->getName(),getCategoriesArray('ecommerce', 'orders')) ?
                  'active_secondary
                  aria-expanded=true' :
                  'aria-expanded=false' }}
                  collapse_trigger="secondary" href="javascript:;" class="after:ease-soft-in-out
                  after:font-awesome-5-free
                  ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center
                  whitespace-nowrap
                  bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2
                  before:-translate-y-1/2
                  before:rounded-3xl before:content-[''] after:ml-auto after:inline-block after:font-bold
                  after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white
                  dark:before:bg-white dark:before:opacity-80 dark:after:text-white {{
                  in_array(request()->route()->getName(),getCategoriesArray('ecommerce', 'orders')) ? 'before:-left-5
                  rounded-lg font-semibold text-slate-800 before:bg-slate-800 before:h-2 before:w-2 after:text-slate-800
                  after:rotate-180 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium
                  text-slate-800/50 before:bg-slate-800/50 after:text-slate-800/50 dark:opacity-60
                  dark:after:text-white/50' }}">

                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    O
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Orders <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="profileExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='order-list' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'order-list' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('order-list') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          O </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Order List
                        </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a {{ Route::currentRouteName()=='order-details' ? 'active_page' : '' }}
                        class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors dark:text-white {{ Route::currentRouteName() == 'order-details' ? 'font-semibold text-slate-800 dark:opacity-100' : 'font-medium text-slate-800/50 dark:opacity-60' }}"
                        href="{{ route('order-details') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          O </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Order Details </span>
                      </a>
                    </li>

                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:content-[''] dark:text-white dark:before:bg-white dark:before:opacity-80 {{ Route::currentRouteName() == 'referral' ? 'before:-left-5 rounded-lg font-semibold text-slate-800 before:h-2 before:w-2 before:bg-slate-800 dark:opacity-100' : 'before:-left-4.5 before:h-1.25 before:w-1.25 font-medium text-slate-800/50 before:bg-slate-800/50 dark:opacity-60' }}"
                  href="{{ route('referral') }}">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    R
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Referral </span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li class="mt-0.5 w-full">

        <li class="mt-0.5 w-full">
          <a collapse_trigger="primary" href="javascript:;"
            class="ease-soft-in-out text-size-sm py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap px-4 font-medium text-slate-500 shadow-none transition-colors after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80 dark:after:text-white/50 dark:after:text-white"
            aria-controls="authExamples" role="button" aria-expanded="false">
            <div
              class="stroke-none shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
              <svg width="12px" height="12px" viewBox="0 0 40 44" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>document</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-1870.000000, -591.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g transform="translate(154.000000, 300.000000)">
                        <path class="fill-slate-800"
                          d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                          opacity="0.603585379"></path>
                        <path class="fill-slate-800"
                          d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Authentication</span>
          </a>

          <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0" id="authExamples">
            <ul class="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
              <li class="w-full">
                <a collapse_trigger="secondary"
                  class="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white"
                  aria-expanded="false" href="javascript:;">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    S
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Sign In <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="signinExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('basic-sign-in') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          B </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Basic </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('cover-sign-in') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          C </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Cover </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('illustration-sign-in') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          I </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Illustration </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a collapse_trigger="secondary"
                  class="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white"
                  aria-expanded="false" href="javascript:;">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    S
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Sign Up <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="signupExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('basic-sign-up') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          B </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Basic </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('cover-sign-up') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          C </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Cover </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('illustration-sign-up') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          I </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Illustration </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="w-full">
                <a collapse_trigger="secondary"
                  class="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white"
                  aria-expanded="false" href="javascript:;">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    R
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Reset Password <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="resetExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('basic-reset') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          B </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Basic </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('cover-reset') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          C </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Cover </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('illustration-reset') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          I </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Illustration </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a collapse_trigger="secondary"
                  class="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white"
                  aria-expanded="false" href="javascript:;">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    L
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Lock <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="lockExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('basic-lock') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          B </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Basic </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('cover-lock') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          C </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Cover </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('illustration-lock') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          I </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Illustration </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a collapse_trigger="secondary"
                  class="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white"
                  aria-expanded="false" href="javascript:;">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    2
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> 2-Step Verification <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="StepExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('basic-verification') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          B </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Basic </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('cover-verification') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          C </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Cover </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('illustration-verification') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          I </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Illustration </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a collapse_trigger="secondary"
                  class="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white"
                  aria-expanded="false" href="javascript:;">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    E
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Error <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="errorExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('error404') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          E </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Error 404 </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="{{ route('error500') }}">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          E </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Error 500 </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li class="mt-0.5 w-full">
          <hr class="h-px my-4 bg-transparent bg-gradient-horizontal-dark dark:bg-gradient-horizontal-light" />
          <h6 class="pl-6 mb-2 ml-2 font-bold leading-tight uppercase text-size-xs opacity-60 dark:text-white">DOCS</h6>
        </li>

        <li class="mt-0.5 w-full">
          <a collapse_trigger="primary" href="javascript:;"
            class="ease-soft-in-out text-size-sm py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap px-4 font-medium text-slate-500 shadow-none transition-colors after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80 dark:after:text-white/50 dark:after:text-white"
            aria-controls="basicExamples" role="button" aria-expanded="false">
            <div
              class="stroke-none shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
              <svg width="12px" height="20px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>spaceship</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-1720.000000, -592.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g transform="translate(4.000000, 301.000000)">
                        <path class="fill-slate-800"
                          d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z">
                        </path>
                        <path class="fill-slate-800"
                          d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z">
                        </path>
                        <path class="fill-slate-800"
                          d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"
                          opacity="0.598539807"></path>
                        <path class="fill-slate-800"
                          d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"
                          opacity="0.598539807"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Basic</span>
          </a>

          <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0" id="basicExamples">
            <ul class="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
              <li class="w-full">
                <a collapse_trigger="secondary"
                  class="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white"
                  aria-expanded="false" href="javascript:;">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    G
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Getting Started <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="gettingStartedExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/soft-ui-dashboard/"
                        target="_blank">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          Q </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Quick Start </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="https://www.creative-tim.com/learning-lab/tailwind/html/license/soft-ui-dashboard/"
                        target="_blank">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          L </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> License </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="https://www.creative-tim.com/learning-lab/tailwind/html/what-is-tailwind-css/soft-ui-dashboard/"
                        target="_blank">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          C </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Contents </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="javascript:;" target="_blank">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          B </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Build Tools </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="w-full">
                <a collapse_trigger="secondary"
                  class="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white"
                  aria-expanded="false" href="javascript:;">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    F
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Foundation <b
                      class="caret"></b></span>
                </a>

                <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
                  id="foundationExample">
                  <ul class="flex flex-col flex-wrap pl-0 mb-0 list-none transition-all duration-200 ease-soft-in-out">
                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="https://www.creative-tim.com/learning-lab/tailwind/html/colors/soft-ui-dashboard/" target="_blank">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          C </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Colors </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="javascript:;" target="_blank">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          G </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Grid </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="https://www.creative-tim.com/learning-lab/tailwind/html/typography/soft-ui-dashboard/"
                        target="_blank">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          T </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Typography </span>
                      </a>
                    </li>

                    <li class="w-full">
                      <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-3.4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors dark:text-white dark:opacity-60"
                        href="javascript:;" target="_blank">
                        <span
                          class="w-0 leading-tight text-center transition-all duration-200 opacity-0 pointer-events-none text-size-xs ease-soft-in-out">
                          I </span>
                        <span class="transition-all duration-100 pointer-events-none ease-soft"> Icons </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li class="mt-0.5 w-full">
          <a collapse_trigger="primary" href="javascript:;"
            class="ease-soft-in-out text-size-sm py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap px-4 font-medium text-slate-500 shadow-none transition-colors after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80 dark:after:text-white/50 dark:after:text-white"
            aria-controls="componentsExamples" role="button" aria-expanded="false">
            <div
              class="stroke-none shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
              <svg width="12px" height="12px" viewBox="0 0 46 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>customer-support</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-1717.000000, -291.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g transform="translate(1.000000, 0.000000)">
                        <path class="fill-slate-800"
                          d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
                          opacity="0.59858631"></path>
                        <path class="fill-slate-800"
                          d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z">
                        </path>
                        <path class="fill-slate-800"
                          d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Components</span>
          </a>

          <div class="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0"
            id="componentsExamples">
            <ul class="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/alert/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    A
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Alerts </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/chip/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    B
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Badge </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/button/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    B
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Buttons </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/card/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    C
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Card </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="javascript:;" target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    C
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Carousel </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/collapse/soft-ui-dashboard/" target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    C
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Collapse </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/dropdown/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    D
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Dropdowns </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/input/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    F
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Forms </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/modal/soft-ui-dashboard/" target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    M
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Modal </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/tabs/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    N
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Navs </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/navbar/soft-ui-dashboard/" target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    N
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Navbar </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="javascript:;" target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    P
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Pagination </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="javascript:;" target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    P
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Popovers </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/progress/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    P
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Progress </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="javascript:;" target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    S
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Spinners </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/table/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    T
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Tables </span>
                </a>
              </li>

              <li class="w-full">
                <a class="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-size-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80"
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/tooltip/soft-ui-dashboard/"
                  target="_blank">
                  <span
                    class="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out">
                    T
                  </span>
                  <span class="transition-all duration-100 pointer-events-none ease-soft"> Tooltips </span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li class="mt-0.5 w-full">
          <a class="ease-soft-in-out text-size-sm py-2.7 active my-0 mx-4 flex items-center whitespace-nowrap px-4 font-medium text-slate-500 shadow-none transition-colors dark:text-white dark:opacity-80"
            href="https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro-tall/blob/main/CHANGELOG.md"
            target="_blank">
            <div
              class="stroke-none shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
              <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>credit-card</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g transform="translate(453.000000, 454.000000)">
                        <path class="fill-slate-800"
                          d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                          opacity="0.593633743"></path>
                        <path class="fill-slate-800"
                          d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Changelog</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="pt-4 mx-4 mt-4">
      <!-- load phantom colors for card after: -->
      <p
        class="invisible hidden text-red-600 text-orange after:bg-gradient-dark-gray after:bg-gradient-cyan after:bg-gradient-orange after:bg-gradient-lime after:bg-gradient-red after:bg-gradient-slate text-lime-500 text-cyan-500">
      </p>
      <div sidenav-card
        class="after:opacity-65 after:bg-gradient-slate relative flex min-w-0 flex-col items-center break-words rounded-2xl border-0 border-solid border-blue-900 bg-white bg-clip-border shadow-none after:absolute after:top-0 after:bottom-0 after:left-0 after:z-10 after:block after:h-full after:w-full after:rounded-2xl after:content-['']">
        <div class="absolute w-full h-full bg-center bg-cover mb-7 rounded-2xl"
          style="background-image: url('../../assets/img/curved-images/white-curved.jpg')"></div>
        <div class="relative z-20 flex-auto w-full p-4 text-left text-white">
          <div
            class="flex items-center justify-center w-8 h-8 mb-4 text-center bg-white bg-center rounded-lg icon shadow-soft-2xl">
            <i sidenav-card-icon
              class="top-0 z-10 text-transparent ni ni-diamond text-size-lg bg-gradient-slate bg-clip-text opacity-80"
              aria-hidden="true"></i>
          </div>
          <div class="transition-all duration-200 ease-nav-brand">
            <h6 class="mb-0 text-white">Need help?</h6>
            <p class="mt-0 mb-4 font-semibold leading-tight text-size-xs">Please check our docs</p>
            <a href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/soft-ui-dashboard/"
              target="_blank"
              class="inline-block w-full px-8 py-2 mb-0 font-bold text-center text-black uppercase transition-all ease-in bg-white border-0 border-white rounded-lg shadow-soft-md bg-150 leading-pro text-size-xs hover:shadow-soft-2xl hover:scale-102">Documentation</a>
          </div>
        </div>
      </div>
      {{-- <!-- pro btn  -->
      <a class="inline-block w-full px-6 py-3 my-4 font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro text-size-xs bg-gradient-fuchsia hover:shadow-soft-2xl hover:scale-102"
        href="https://www.creative-tim.com/product/soft-ui-dashboard-pro-tall">Upgrade to pro</a> --}}
      <!-- free btn  -->
      <a class="inline-block w-full px-6 py-3 my-4 font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro text-size-xs bg-gradient-fuchsia hover:shadow-soft-2xl hover:scale-102"
        href="https://www.creative-tim.com/product/soft-ui-dashboard-tall" target="_blank">Get free version</a>
    </div>
  </aside>