    <nav
        class="absolute top-0 flex flex-wrap items-center justify-between w-full px-4 py-2 lg:flex-nowrap lg:justify-start z-30 {{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'left-0 right-0  mx-6 my-4 shadow-soft-2xl bg-white/80 backdrop-blur-2xl backdrop-saturate-200 rounded-blur' : 'mt-6 mb-4 shadow-none' }}">

        <div class="container flex flex-wrap items-center justify-between lg:flex-nowrap">

            <a class="py-2.5 text-size-sm mr-4 ml-4 whitespace-nowrap font-bold text-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }} lg:ml-0"
                href="{{ env('APP_URL') }}">Soft UI Dashboard PRO</a>

            <button aria-expanded="false" nav-collapse-trigger
                class="px-3 py-1 ml-2 leading-none bg-transparent rounded-lg shadow-none cursor-pointer lg:hidden text-size-lg text-slate-700">
                <span class="inline-block mt-2 align-middle w-6-em h-6-em bg-none">
                    <span bar1
                        class="block relative w-5.5 h-px rounded-px bg-white transition-all duration-200 mx-auto my-0 origin-10-10"></span>
                    <span bar2
                        class="block relative w-5.5 h-px rounded-px bg-white transition-all duration-200 mx-auto my-0 mt-1.75"></span>
                    <span bar3
                        class="block relative w-5.5 h-px rounded-px bg-white transition-all duration-200 mx-auto my-0 mt-1.75 origin-10-90"></span>
                </span>
            </button>

            <div
                class="items-center w-full pt-4 pb-2 transition-all duration-350 ease-soft-in-out lg-max:max-h-0 lg-max:overflow-auto lg-max:hidden lg-max:bg-white lg-max:shadow-soft-3xl md-max:relative grow basis-full rounded-2xl lg:flex lg:basis-auto lg:py-0">

                @auth
                <ul class="flex flex-col pl-0 mx-auto mb-0 list-none md-max:w-full lg:flex-row">
                    <li
                        class="relative mx-2 group md-max:static lg:after:content-[''] lg:after:top-0 lg:hover:after:top-full lg:after:absolute lg:after:left-0 lg:after:-bottom-6 lg:after:w-full lg:after:h-full">

                        <a aria-expanded="false" nav-dropdown-trigger="pages" role="button"
                            class="flex items-center justify-between px-4 py-2 pl-2 font-normal text-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }} transition-all cursor-pointer select-none lg:group-hover:opacity-75 lg-max:text-slate-700 ease-soft-in-out lg:px-2 text-size-sm">
                            Pages



                            <img src="{{ asset('assets') }}/img/down-arrow-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }}.svg"
                                alt="down-arrow" class="hidden ml-1 lg:block">
                            <img src="{{ asset('assets') }}/img/down-arrow-dark.svg" alt="down-arrow"
                                class="block ml-1 lg:hidden">
                        </a>

                        <div nav-dropdown="pages"
                            class="sm-max:right-auto md-max:left-0 md-max:right-0 lg-max:bg-transparent lg-max:overflow-scroll lg-max:relative lg-max:shadow-none lg-max:transform-none lg-max:block lg-max:h-0 lg-max:transition-all lg-max:duration-350 lg-max:ease-soft lg-max:pt-0 lg-max:pb-0 lg-max:opacity-0 lg-max:top-0 lg-max:origin-top lg-max:pointer-events-none  static p-4 m-0 mt-0 text-left list-none bg-white rounded-2xl lg:mt-4 lg:min-w-160 lg:absolute z-100 text-size-sm text-slate-500 bg-clip-padding lg:shadow-soft-3xl lg:cursor-pointer lg:transition-all lg:duration-250 lg:block lg:group-focus:pointer-events-auto lg:group-focus:transform-dropdown-show lg:group-focus:opacity-100 lg:group-focus:before:-top-5 lg:group-hover:opacity-100 lg:opacity-0 lg:top-0 lg:origin-top lg:group-hover:pointer-events-auto lg:group-hover:transform-dropdown-show lg:pointer-events-none lg:transform-dropdown lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:group-hover:before:-top-4.8  lg:before:left-7 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft">
                            <div class="flex-wrap hidden -mx-3 lg:flex">
                                <div class="w-full max-w-full px-6 py-2 flex-0">
                                    <div class="flex flex-wrap -mx-3">
                                        <div class="relative w-4/12 max-w-full px-3 flex-0">
                                            <div
                                                class="flex items-center px-0 py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 40 40"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>spaceship</title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-1720.000000, -592.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(4.000000, 301.000000)">
                                                                            <path class=""
                                                                                d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z">
                                                                            </path>
                                                                            <path class=""
                                                                                d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z">
                                                                            </path>
                                                                            <path class=""
                                                                                d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"
                                                                                opacity="0.598539807"></path>
                                                                            <path class=""
                                                                                d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"
                                                                                opacity="0.598539807"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                Dashboards
                                            </div>
                                            <a href="{{ route('analytics') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Default</span>
                                            </a>
                                            <a href="{{ route('automotive') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Automotive</span>
                                            </a>
                                            <a href="{{ route('smart-home') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Smart Home</span>
                                            </a>
                                            <a href="{{ route('vr-default') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Virtual Reality</span>
                                            </a>
                                            <a href="{{ route('crm') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">CRM</span>
                                            </a>
                                            <div
                                                class="flex items-center px-0 py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 42 42"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>office</title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-1869.000000, -293.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(153.000000, 2.000000)">
                                                                            <path
                                                                                d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                                                                                opacity="0.6"></path>
                                                                            <path
                                                                                d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                Users
                                            </div>
                                            <a href="{{ route('reports') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Reports</span>
                                            </a>
                                            <a href="{{ route('new-user') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">New User</span>
                                            </a>
                                            <hr
                                                class="absolute top-0 right-0 w-px h-full bg-transparent bg-gradient-vertical-dark">
                                        </div>
                                        <div class="relative w-4/12 max-w-full px-3 flex-0">
                                            <div
                                                class="flex items-center px-0 py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 45 40"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>shop </title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-1716.000000, -439.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(0.000000, 148.000000)">
                                                                            <path
                                                                                d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                                                                                opacity="0.598981585"></path>
                                                                            <path
                                                                                d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z">
                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                Profile
                                            </div>
                                            <a href="{{ route('profile-overview') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Overview</span>
                                            </a>
                                            <a href="{{ route('profile-teams') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Teams</span>
                                            </a>
                                            <a href="{{ route('profile-projects') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Projects</span>
                                            </a>
                                            <div
                                                class="flex items-center px-0 py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 42 42"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>box-3d-50</title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-2319.000000, -291.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(603.000000, 0.000000)">
                                                                            <path
                                                                                d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                                                                            </path>
                                                                            <path
                                                                                d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                                                                opacity="0.7"></path>
                                                                            <path
                                                                                d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                                                                opacity="0.7"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                Projects
                                            </div>
                                            <a href="{{ route('general') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">General</span>
                                            </a>
                                            <a href="{{ route('timeline') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Timeline</span>
                                            </a>
                                            <a href="{{ route('new-project') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">New Project</span>
                                            </a>
                                            <hr
                                                class="absolute top-0 right-0 w-px h-full bg-transparent bg-gradient-vertical-dark">
                                        </div>
                                        <div class="w-4/12 max-w-full px-3 flex-0">
                                            <div
                                                class="flex items-center px-0 py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 46 42"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>customer-support</title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-1717.000000, -291.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(1.000000, 0.000000)">
                                                                            <path class="fill-slate-300"
                                                                                d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
                                                                                opacity="0.59858631"></path>
                                                                            <path class="color-foreground"
                                                                                d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z">
                                                                            </path>
                                                                            <path class="color-foreground"
                                                                                d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z">
                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                Account
                                            </div>
                                            <a href="{{ route('settings') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Settings</span>
                                            </a>
                                            <a href="{{ route('billing') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Billing</span>
                                            </a>
                                            <a href="{{ route('invoice') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Invoice</span>
                                            </a>
                                            <a href="{{ route('security') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Security</span>
                                            </a>
                                            <div
                                                class="flex items-center px-0 py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 40 44"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>document</title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-1870.000000, -591.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g
                                                                            transform="translate(154.000000, 300.000000)">
                                                                            <path
                                                                                d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                                                                opacity="0.603585379"></path>
                                                                            <path
                                                                                d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                Extra
                                            </div>
                                            <a href="{{ route('pricing-page') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Pricing Page</span>
                                            </a>
                                            <a href="{{ route('messages') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Messages</span>
                                            </a>
                                            <a href="{{ route('rtl') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">RTL Page</span>
                                            </a>
                                            <a href="{{ route('widgets') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Widgets</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="lg:hidden">
                                <div
                                    class="flex items-center py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>shop </title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-1716.000000, -439.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(0.000000, 148.000000)">
                                                                <path
                                                                    d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                                                                    opacity="0.598981585"></path>
                                                                <path
                                                                    d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    Dashboards
                                </div>
                                <a href="{{ route('analytics') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Default
                                </a>
                                <a href="{{ route('automotive') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Automotive
                                </a>
                                <a href="{{ route('smart-home') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Smart Home
                                </a>
                                <a href="{{ route('vr-default') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Virtual Reality
                                </a>
                                <a href="{{ route('crm') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    CRM
                                </a>
                                <div
                                    class="flex items-center py-2 mt-4 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>office</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(153.000000, 2.000000)">
                                                                <path
                                                                    d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                                                                    opacity="0.6"></path>
                                                                <path
                                                                    d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    Users
                                </div>
                                <a href="{{ route('reports') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Reports
                                </a>
                                <a href="{{ route('new-user') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    New user
                                </a>
                                <div
                                    class="flex items-center py-2 mt-4 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg width="12px" height="12px" viewBox="0 0 46 42" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>customer-support</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-1717.000000, -291.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(1.000000, 0.000000)">
                                                                <path class="fill-slate-300"
                                                                    d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
                                                                    opacity="0.59858631"></path>
                                                                <path class="color-foreground"
                                                                    d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z">
                                                                </path>
                                                                <path class="color-foreground"
                                                                    d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    Profile
                                </div>
                                <a href="{{ route('profile-overview') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Overview
                                </a>
                                <a href="{{ route('profile-teams') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Teams
                                </a>
                                <a href="{{ route('profile-projects') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Projects
                                </a>
                                <div
                                    class="flex items-center py-2 mt-4 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>box-3d-50</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-2319.000000, -291.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(603.000000, 0.000000)">
                                                                <path
                                                                    d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                                                                </path>
                                                                <path
                                                                    d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                                                    opacity="0.7"></path>
                                                                <path
                                                                    d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                                                    opacity="0.7"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    Projects
                                </div>
                                <a href="{{ route('general') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    General
                                </a>
                                <a href="{{ route('timeline') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Timeline
                                </a>
                                <a href="{{ route('new-project') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    New Project
                                </a>
                                <div
                                    class="flex items-center py-2 mt-4 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg width="12px" height="12px" viewBox="0 0 40 44" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>document</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-1870.000000, -591.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(154.000000, 300.000000)">
                                                                <path
                                                                    d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                                                    opacity="0.603585379"></path>
                                                                <path
                                                                    d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    Account
                                </div>
                                <a href="{{ route('settings') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Settings
                                </a>
                                <a href="{{ route('billing') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Billing
                                </a>
                                <a href="{{ route('invoice') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Invoice
                                </a>
                                <a href="{{ route('security') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Security
                                </a>
                                <div
                                    class="flex items-center py-2 mt-4 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg class="" width="12px" height="20px" viewBox="0 0 40 40" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>spaceship</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-1720.000000, -592.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(4.000000, 301.000000)">
                                                                <path
                                                                    d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z">
                                                                </path>
                                                                <path
                                                                    d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z">
                                                                </path>
                                                                <path
                                                                    d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"
                                                                    opacity="0.598539807"></path>
                                                                <path
                                                                    d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"
                                                                    opacity="0.598539807"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    Extra
                                </div>
                                <a href="{{ route('pricing-page') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Pricing Page
                                </a>
                                <a href="{{ route('messages') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Messages
                                </a>
                                <a href="{{ route('rtl') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    RTL Page
                                </a>
                                <a href="{{ route('widgets') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Widgets
                                </a>
                            </div>
                        </div>
                    </li>
                    <li
                        class="relative mx-2 md-max:static group lg:after:content-[''] lg:after:top-0 lg:hover:after:top-full lg:after:absolute lg:after:left-0 lg:after:-bottom-6 lg:after:w-full lg:after:h-full">

                        <a aria-expanded="false" nav-dropdown-trigger="authentication" role="button"
                            class="flex items-center justify-between px-4 py-2 pl-2 font-normal text-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }} transition-all cursor-pointer select-none lg:group-hover:opacity-75 lg-max:text-slate-700 ease-soft-in-out lg:px-2 text-size-sm">
                            Authentication
                            <img src="{{ asset('assets') }}/img/down-arrow-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }}.svg"
                                alt="down-arrow" class="hidden ml-1 lg:block">
                            <img src="{{ asset('assets') }}/img/down-arrow-dark.svg" alt="down-arrow"
                                class="block ml-1 lg:hidden">
                        </a>


                        <div nav-dropdown="authentication"
                            class=" lg:group-hover:pointer-events-auto lg:group-hover:transform-dropdown-show lg:group-hover:opacity-100 lg:group-hover:before:-top-4.8  sm-max:right-auto md-max:left-0 md-max:right-0 lg-max:bg-transparent lg-max:overflow-scroll lg-max:relative lg-max:shadow-none lg-max:transform-none lg-max:block lg-max:h-0 lg-max:transition-all lg-max:duration-350 lg-max:ease-soft lg-max:pt-0 lg-max:pb-0 lg-max:opacity-0 lg-max:top-0 lg-max:origin-top lg-max:pointer-events-none static p-4 m-0 mt-0 text-left list-none bg-white rounded-2xl lg:mt-4 lg:min-w-92 lg:absolute z-100 text-size-sm text-slate-500 bg-clip-padding lg:shadow-soft-3xl lg:cursor-pointer lg:transition-all lg:duration-250 lg:block lg:opacity-0 lg:top-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-7 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft">
                            <div class="flex-wrap hidden -mx-3 lg:flex">
                                <div class="w-6/12 max-w-full px-3 flex-0">
                                    <div
                                        class="flex relative w-full h-full py-16 rounded-xl bg-cover bg-[url('../../assets/img/curved-images/curved8.jpg')]">
                                        <div
                                            class="absolute top-0 left-0 w-full h-full bg-center bg-cover opacity-80 rounded-xl bg-gradient-fuchsia">
                                        </div>
                                        <div
                                            class="flex flex-col items-center justify-center w-full font-semibold text-center text-white z-1">
                                            <div
                                                class="inline-block w-12 h-12 text-center text-black bg-white bg-center fill-current stroke-none shadow-soft-2xl rounded-circle ">
                                                <i
                                                    class="ni ni-diamond bg-gradient-fuchsia bg-clip-text text-transparent opacity-80 relative z-1 text-size-lg top-3.5 "></i>
                                            </div>
                                            <span class="mt-2 text-size-lg">
                                                Explore our
                                                <br>
                                                utilities pages
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-center w-6/12 max-w-full px-3 pl-0 flex-0">
                                    <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                                        <li nav-nested-menu-trigger
                                            class="after:absolute after:content-[''] after:h-full after:left-full after:w-1/2 after:bottom-0 relative block p-0 bg-white border-0 rounded-t-lg">
                                            <a
                                                class="select-none hover:text-slate-700 hover:bg-gray-200 flex w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit bg-transparent border-0 justify-between items-center mb-1 pl-4 rounded-lg lg:transition-colors lg:duration-300 lg:ease-soft">
                                                <span>Sign In</span>
                                                <img src="{{ asset('assets') }}/img/down-arrow.svg" alt="down-arrow"
                                                    class="lg:-rotate-90">
                                            </a>
                                            <div nav-nested-menu
                                                class="z-100 hidden min-w-44 px-2 py-4 m-0 text-size-sm text-left list-none bg-white bg-clip-padding rounded-lg mt-0 static lg:cursor-pointer lg:shadow-soft-3xl lg:transition-all lg:duration-250 lg:absolute lg:block lg:opacity-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown-nested -right-50 left-auto top-0 lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-0 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft lg:before:-z-1 lg:before:-rotate-90">
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('basic-sign-in') }}">
                                                    <span>Basic</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('cover-sign-in') }}">
                                                    <span>Cover</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('illustration-sign-in') }}">
                                                    <span>Illustration</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li nav-nested-menu-trigger
                                            class="after:absolute after:content-[''] after:h-full after:left-full after:w-1/2 after:bottom-0 relative block p-0 bg-white border-0 ">
                                            <a
                                                class="select-none hover:text-slate-700 hover:bg-gray-200 flex w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit bg-transparent border-0 justify-between items-center mb-1 pl-4 rounded-lg lg:transition-colors lg:duration-300 lg:ease-soft">
                                                <span>Sign Up</span>
                                                <img src="{{ asset('assets') }}/img/down-arrow.svg" alt="down-arrow"
                                                    class="lg:-rotate-90">
                                            </a>
                                            <div nav-nested-menu
                                                class="z-100 hidden min-w-44 px-2 py-4 m-0 text-size-sm text-left list-none bg-white bg-clip-padding rounded-lg mt-0 static lg:cursor-pointer lg:shadow-soft-3xl lg:transition-all lg:duration-250 lg:absolute lg:block lg:opacity-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown-nested -right-50 left-auto top-0 lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-0 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft lg:before:-z-1 lg:before:-rotate-90">
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('basic-sign-up') }}">
                                                    <span>Basic</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('cover-sign-up') }}">
                                                    <span>Cover</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('illustration-sign-up') }}">
                                                    <span>Illustration</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li nav-nested-menu-trigger
                                            class="after:absolute after:content-[''] after:h-full after:left-full after:w-1/2 after:bottom-0 relative block p-0 bg-white border-0 ">
                                            <a
                                                class="select-none hover:text-slate-700 hover:bg-gray-200 flex w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit bg-transparent border-0 justify-between items-center mb-1 pl-4 rounded-lg lg:transition-colors lg:duration-300 lg:ease-soft">
                                                <span>Reset Password</span>
                                                <img src="{{ asset('assets') }}/img/down-arrow.svg" alt="down-arrow"
                                                    class="lg:-rotate-90">
                                            </a>
                                            <div nav-nested-menu
                                                class="z-100 hidden min-w-44 px-2 py-4 m-0 text-size-sm text-left list-none bg-white bg-clip-padding rounded-lg mt-0 static lg:cursor-pointer lg:shadow-soft-3xl lg:transition-all lg:duration-250 lg:absolute lg:block lg:opacity-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown-nested -right-50 left-auto top-0 lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-0 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft lg:before:-z-1 lg:before:-rotate-90">
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('basic-reset') }}">
                                                    <span>Basic</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('cover-reset') }}">
                                                    <span>Cover</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('illustration-reset') }}">
                                                    <span>Illustration</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li nav-nested-menu-trigger
                                            class="after:absolute after:content-[''] after:h-full after:left-full after:w-1/2 after:bottom-0 relative block p-0 bg-white border-0 ">
                                            <a
                                                class="select-none hover:text-slate-700 hover:bg-gray-200 flex w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit bg-transparent border-0 justify-between items-center mb-1 pl-4 rounded-lg lg:transition-colors lg:duration-300 lg:ease-soft">
                                                <span>Lock</span>
                                                <img src="{{ asset('assets') }}/img/down-arrow.svg" alt="down-arrow"
                                                    class="lg:-rotate-90">
                                            </a>
                                            <div nav-nested-menu
                                                class="z-100 hidden min-w-44 px-2 py-4 m-0 text-size-sm text-left list-none bg-white bg-clip-padding rounded-lg mt-0 static lg:cursor-pointer lg:shadow-soft-3xl lg:transition-all lg:duration-250 lg:absolute lg:block lg:opacity-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown-nested -right-50 left-auto top-0 lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-0 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft lg:before:-z-1 lg:before:-rotate-90">
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('basic-lock') }}">
                                                    <span>Basic</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('cover-lock') }}">
                                                    <span>Cover</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('illustration-lock') }}">
                                                    <span>Illustration</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li nav-nested-menu-trigger
                                            class="after:absolute after:content-[''] after:h-full after:left-full after:w-1/2 after:bottom-0 relative block p-0 bg-white border-0 ">
                                            <a
                                                class="select-none hover:text-slate-700 hover:bg-gray-200 flex w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit bg-transparent border-0 justify-between items-center mb-1 pl-4 rounded-lg lg:transition-colors lg:duration-300 lg:ease-soft">
                                                <span>2-Step Verification</span>
                                                <img src="{{ asset('assets') }}/img/down-arrow.svg" alt="down-arrow"
                                                    class="lg:-rotate-90">
                                            </a>
                                            <div nav-nested-menu
                                                class="z-100 hidden min-w-44 px-2 py-4 m-0 text-size-sm text-left list-none bg-white bg-clip-padding rounded-lg mt-0 static lg:cursor-pointer lg:shadow-soft-3xl lg:transition-all lg:duration-250 lg:absolute lg:block lg:opacity-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown-nested -right-50 left-auto top-0 lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-0 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft lg:before:-z-1 lg:before:-rotate-90">
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('basic-verification') }}">
                                                    <span>Basic</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('cover-verification') }}">
                                                    <span>Cover</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('illustration-verification') }}">
                                                    <span>Illustration</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li nav-nested-menu-trigger
                                            class="after:absolute after:content-[''] after:h-full after:left-full after:w-1/2 after:bottom-0 relative block p-0 bg-white border-0 rounded-b-lg">
                                            <a
                                                class="select-none hover:text-slate-700 hover:bg-gray-200 flex w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit bg-transparent border-0 justify-between items-center mb-1 pl-4 rounded-lg lg:transition-colors lg:duration-300 lg:ease-soft">
                                                <span>Error</span>
                                                <img src="{{ asset('assets') }}/img/down-arrow.svg" alt="down-arrow"
                                                    class="lg:-rotate-90">
                                            </a>
                                            <div nav-nested-menu
                                                class="z-100 hidden min-w-44 px-2 py-4 m-0 text-size-sm text-left list-none bg-white bg-clip-padding rounded-lg mt-0 static lg:cursor-pointer lg:shadow-soft-3xl lg:transition-all lg:duration-250 lg:absolute lg:block lg:opacity-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown-nested -right-50 left-auto top-0 lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-0 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft lg:before:-z-1 lg:before:-rotate-90">
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('error404') }}">
                                                    <span>404</span>
                                                </a>
                                                <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg mb-1"
                                                    href="{{ route('error500') }}">
                                                    <span>500</span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            <div class="flex flex-wrap -mx-3 lg:hidden">
                                <div class="flex flex-col justify-center w-full max-w-full px-3 flex-0">
                                    <h6
                                        class="flex px-0 py-2 mb-0 font-bold text-size-sm text-slate-700 whitespace-nowrap">
                                        Sign In</h6>
                                    <a href="{{ route('basic-sign-in') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Basic
                                    </a>
                                    <a href="{{ route('cover-sign-in') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Cover
                                    </a>
                                    <a href="{{ route('illustration-sign-in') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Illustration
                                    </a>
                                    <h6
                                        class="flex px-0 py-2 mt-4 mb-0 font-bold text-size-sm text-slate-700 whitespace-nowrap">
                                        Sign Up
                                    </h6>
                                    <a href="{{ route('basic-sign-up') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Basic
                                    </a>
                                    <a href="{{ route('cover-sign-up') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Cover
                                    </a>
                                    <a href="{{ route('illustration-sign-up') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Illustration
                                    </a>
                                    <h6
                                        class="flex px-0 py-2 mt-4 mb-0 font-bold text-size-sm text-slate-700 whitespace-nowrap">
                                        Reset Password
                                    </h6>
                                    <a href="{{ route('basic-reset') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Basic
                                    </a>
                                    <a href="{{ route('cover-reset') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Cover
                                    </a>
                                    <a href="{{ route('illustration-reset') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Illustation
                                    </a>
                                    <h6
                                        class="flex px-0 py-2 mt-4 mb-0 font-bold text-size-sm text-slate-700 whitespace-nowrap">
                                        Lock
                                    </h6>
                                    <a href="{{ route('basic-lock') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Basic
                                    </a>
                                    <a href="{{ route('cover-lock') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Cover
                                    </a>
                                    <a href="{{ route('illustration-lock') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Illustration
                                    </a>
                                    <h6
                                        class="flex px-0 py-2 mt-4 mb-0 font-bold text-size-sm text-slate-700 whitespace-nowrap">
                                        2-Step Verification
                                    </h6>
                                    <a href="{{ route('basic-verification') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Basic
                                    </a>
                                    <a href="{{ route('cover-verification') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Cover
                                    </a>
                                    <a href="{{ route('cover-verification') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        Illustration
                                    </a>
                                    <h6
                                        class="flex px-0 py-2 mt-4 mb-0 font-bold text-size-sm text-slate-700 whitespace-nowrap">
                                        Error
                                    </h6>
                                    <a href="{{ route('error404') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        404
                                    </a>
                                    <a href="{{ route('error500') }}"
                                        class="block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                        500
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li
                        class="relative mx-2 md-max:static group lg:after:content-[''] lg:after:top-0 lg:hover:after:top-full lg:after:absolute lg:after:left-0 lg:after:-bottom-6 lg:after:w-full lg:after:h-full">

                        <a aria-expanded="false" nav-dropdown-trigger="applications" role="button"
                            class="flex items-center justify-between px-4 py-2 pl-2 font-normal text-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }} transition-all cursor-pointer select-none lg:group-hover:opacity-75 lg-max:text-slate-700 ease-soft-in-out lg:px-2 text-size-sm">
                            Applications
                            <img src="{{ asset('assets') }}/img/down-arrow-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }}.svg"
                                alt="down-arrow" class="hidden ml-1 lg:block">
                            <img src="{{ asset('assets') }}/img/down-arrow-dark.svg" alt="down-arrow"
                                class="block ml-1 lg:hidden">
                        </a>


                        <div nav-dropdown="applications"
                            class=" lg:group-hover:pointer-events-auto lg:group-hover:transform-dropdown-show lg:group-hover:opacity-100 lg:group-hover:before:-top-4.8  sm-max:right-auto md-max:left-0 md-max:right-0 lg-max:bg-transparent lg-max:overflow-scroll lg-max:relative lg-max:shadow-none lg-max:transform-none lg-max:block lg-max:h-0 lg-max:transition-all lg-max:duration-350 lg-max:ease-soft lg-max:pt-0 lg-max:pb-0 lg-max:opacity-0 lg-max:top-0 lg-max:origin-top lg-max:pointer-events-none static p-4 m-0 mt-0 text-left list-none bg-white rounded-xl lg:mt-4 lg:min-w-60 lg:absolute z-100 text-size-sm text-slate-500 bg-clip-padding lg:shadow-soft-3xl lg:cursor-pointer lg:transition-all lg:duration-250 lg:block lg:opacity-0 lg:top-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-7 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft">
                            <div class="hidden lg:flex">
                                <ul class="flex flex-col w-full pl-0 mb-0 list-none">
                                    <li class="relative block p-0 bg-white border-0 rounded-t-lg">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-gray-200 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="{{ route('kanban') }}">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <i
                                                        class="relative text-transparent ni ni-single-copy-04 bg-gradient-fuchsia bg-clip-text z-1"></i>
                                                </div>
                                                <div class="flex items-center justify-between w-full">
                                                    <div>
                                                        <p
                                                            class="block p-0 mb-0 text-size-sm whitespace-nowrap text-slate-700">
                                                            Kanban</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="relative block p-0 bg-white border-0">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-gray-200 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="{{ route('wizard') }}">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <i
                                                        class="relative text-transparent ni ni-laptop bg-gradient-fuchsia bg-clip-text z-1"></i>
                                                </div>
                                                <div class="flex items-center justify-between w-full">
                                                    <div>
                                                        <p
                                                            class="block p-0 mb-0 text-size-sm whitespace-nowrap text-slate-700">
                                                            Wizard</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="relative block p-0 bg-white border-0">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-gray-200 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="{{ route('datatables') }}">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <i
                                                        class="relative text-transparent ni ni-badge bg-gradient-fuchsia bg-clip-text z-1"></i>
                                                </div>
                                                <div class="flex items-center justify-between w-full">
                                                    <div>
                                                        <p
                                                            class="block p-0 mb-0 text-size-sm whitespace-nowrap text-slate-700">
                                                            DataTables</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="relative block p-0 bg-white border-0 rounded-b-lg">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-gray-200 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="{{ route('calendar') }}">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <i
                                                        class="relative text-transparent ni ni-notification-70 bg-gradient-fuchsia bg-clip-text z-1"></i>
                                                </div>
                                                <div class="flex items-center justify-between w-full">
                                                    <div>
                                                        <p
                                                            class="block p-0 mb-0 text-size-sm whitespace-nowrap text-slate-700">
                                                            Calendar</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <div class="flex flex-wrap -mx-3 lg:hidden">
                                <div class="w-full max-w-full px-3 md:w-full md:flex-0 shrink-0">
                                    <a class="py-2 pl-4 rounded-lg" href="{{ route('kanban') }}">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current stroke-none h-4-em w-4-em">
                                                <i
                                                    class="relative text-transparent ni ni-single-copy-04 bg-gradient-fuchsia bg-clip-text z-1"></i>
                                            </div>
                                            <div class="flex items-center justify-between w-full">
                                                <div>
                                                    <p
                                                        class="block p-0 mb-0 text-size-sm whitespace-nowrap text-slate-700">
                                                        Kanban</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="py-2 pl-4 rounded-lg" href="{{ route('wizard') }}">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current stroke-none h-4-em w-4-em">
                                                <i
                                                    class="relative text-transparent ni ni-laptop bg-gradient-fuchsia bg-clip-text z-1"></i>
                                            </div>
                                            <div class="flex items-center justify-between w-full">
                                                <div>
                                                    <p
                                                        class="block p-0 mb-0 text-size-sm whitespace-nowrap text-slate-700">
                                                        Wizard</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="py-2 pl-4 rounded-lg" href="{{ route('datatables') }}">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current stroke-none h-4-em w-4-em">
                                                <i
                                                    class="relative text-transparent ni ni-badge bg-gradient-fuchsia bg-clip-text z-1"></i>
                                            </div>
                                            <div class="flex items-center justify-between w-full">
                                                <div>
                                                    <p
                                                        class="block p-0 mb-0 text-size-sm whitespace-nowrap text-slate-700">
                                                        DataTables</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="py-2 pl-4 rounded-lg" href="{{ route('calendar') }}">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current stroke-none h-4-em w-4-em">
                                                <i
                                                    class="relative text-transparent ni ni-notification-70 bg-gradient-fuchsia bg-clip-text z-1"></i>
                                            </div>
                                            <div class="flex items-center justify-between w-full">
                                                <div>
                                                    <p
                                                        class="block p-0 mb-0 text-size-sm whitespace-nowrap text-slate-700">
                                                        Calendar</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li
                        class="relative mx-2 md-max:static group lg:after:content-[''] lg:after:top-0 lg:hover:after:top-full lg:after:absolute lg:after:left-0 lg:after:-bottom-6 lg:after:w-full lg:after:h-full">

                        <a aria-expanded="false" nav-dropdown-trigger="ecommerce" role="button"
                            class="flex items-center justify-between px-4 py-2 pl-2 font-normal text-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }} transition-all cursor-pointer select-none lg:group-hover:opacity-75 lg-max:text-slate-700 ease-soft-in-out lg:px-2 text-size-sm">
                            Ecommerce
                            <img src="{{ asset('assets') }}/img/down-arrow-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }}.svg"
                                alt="down-arrow" class="hidden ml-1 lg:block">
                            <img src="{{ asset('assets') }}/img/down-arrow-dark.svg" alt="down-arrow"
                                class="block ml-1 lg:hidden">
                        </a>


                        <div nav-dropdown="ecommerce"
                            class=" lg:group-hover:pointer-events-auto lg:group-hover:transform-dropdown-show lg:group-hover:opacity-100 lg:group-hover:before:-top-4.8  sm-max:right-auto md-max:left-0 md-max:right-0 lg-max:bg-transparent lg-max:overflow-scroll lg-max:relative lg-max:shadow-none lg-max:transform-none lg-max:block lg-max:h-0 lg-max:transition-all lg-max:duration-350 lg-max:ease-soft lg-max:pt-0 lg-max:pb-0 lg-max:opacity-0 lg-max:top-0 lg-max:origin-top lg-max:pointer-events-none static p-4 m-0 mt-0 text-left list-none bg-white rounded-2xl lg:mt-4 lg:min-w-92 lg:absolute z-100 text-size-sm text-slate-500 bg-clip-padding lg:shadow-soft-3xl lg:cursor-pointer lg:transition-all lg:duration-250 lg:block lg:opacity-0 lg:top-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-7 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft">

                            <div class="flex-wrap hidden -mx-3 lg:flex">
                                <div class="w-full max-w-full px-6 py-2 flex-0">
                                    <div class="flex flex-wrap -mx-3">
                                        <div class="relative w-6/12 max-w-full px-3 flex-0">
                                            <div
                                                class="flex items-center px-0 py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 40 44"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>document</title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-1870.000000, -591.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g
                                                                            transform="translate(154.000000, 300.000000)">
                                                                            <path
                                                                                d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                                                                opacity="0.603585379"></path>
                                                                            <path
                                                                                d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                Orders
                                            </div>
                                            <a href="{{ route('order-list') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Order List</span>
                                            </a>
                                            <a href="{{ route('order-details') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Order Details</span>
                                            </a>
                                            <div
                                                class="flex items-center px-0 py-2 mt-4 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 42 42"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>box-3d-50</title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-2319.000000, -291.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(603.000000, 0.000000)">
                                                                            <path
                                                                                d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                                                                            </path>
                                                                            <path
                                                                                d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                                                                opacity="0.7"></path>
                                                                            <path
                                                                                d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                                                                opacity="0.7"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                General
                                            </div>
                                            <a href="{{ route('overview') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Overview</span>
                                            </a>
                                            <a href="{{ route('referral') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Referral</span>
                                            </a>
                                            <hr
                                                class="absolute top-0 right-0 w-px h-full bg-transparent bg-gradient-vertical-dark">
                                        </div>
                                        <div class="relative w-6/12 max-w-full px-3 flex-0">
                                            <div
                                                class="flex items-center px-0 py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700 ">
                                                <div class="inline-block">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current stroke-none bg-gradient-fuchsia">
                                                        <svg width="12px" height="12px" viewBox="0 0 45 40"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <title>shop </title>
                                                            <g stroke="none" stroke-width="1" fill="none"
                                                                fill-rule="evenodd">
                                                                <g transform="translate(-1716.000000, -439.000000)"
                                                                    fill="#FFFFFF" fill-rule="nonzero">
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(0.000000, 148.000000)">
                                                                            <path
                                                                                d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                                                                                opacity="0.598981585"></path>
                                                                            <path
                                                                                d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z">
                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                Products
                                            </div>
                                            <a href="{{ route('new-product') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">New Product</span>
                                            </a>
                                            <a href="{{ route('edit-product') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Edit Product</span>
                                            </a>
                                            <a href="{{ route('product-page') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Product Page</span>
                                            </a>
                                            <a href="{{ route('products-list') }}"
                                                class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg">
                                                <span class="pl-4">Products List</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="lg:hidden">
                                <div
                                    class="flex items-center py-2 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg width="12px" height="12px" viewBox="0 0 40 44" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>document</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-1870.000000, -591.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(154.000000, 300.000000)">
                                                                <path
                                                                    d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                                                    opacity="0.603585379"></path>
                                                                <path
                                                                    d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    Orders
                                </div>
                                <a href="{{ route('order-list') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Order List
                                </a>
                                <a href="{{ route('order-details') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Order Details
                                </a>
                                <div
                                    class="flex items-center py-2 mt-4 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>box-3d-50</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-2319.000000, -291.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(603.000000, 0.000000)">
                                                                <path
                                                                    d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                                                                </path>
                                                                <path
                                                                    d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                                                    opacity="0.7"></path>
                                                                <path
                                                                    d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                                                    opacity="0.7"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    General
                                </div>
                                <a href="{{ route('overview') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Overview
                                </a>
                                <a href="{{ route('referral') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Referral
                                </a>
                                <div
                                    class="flex items-center py-2 mt-4 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                    <div class="inline-block">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 mr-2 text-center text-black bg-center rounded-lg fill-current bg-gradient-fuchsia stroke-none">
                                            <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>shop </title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-1716.000000, -439.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(0.000000, 148.000000)">
                                                                <path
                                                                    d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                                                                    opacity="0.598981585"></path>
                                                                <path
                                                                    d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    Products
                                </div>
                                <a href="{{ route('new-product') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    New Product
                                </a>
                                <a href="{{ route('edit-product') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Edit Product
                                </a>
                                <a href="{{ route('product-page') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Product Page
                                </a>
                                <a href="{{ route('products-list') }}"
                                    class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 rounded-lg">
                                    Products List
                                </a>
                            </div>
                        </div>
                    </li>




                    <li
                        class="relative mx-2 md-max:static group lg:after:content-[''] lg:after:top-0 lg:hover:after:top-full lg:after:absolute lg:after:left-0 lg:after:-bottom-6 lg:after:w-full lg:after:h-full">

                        <a aria-expanded="false" nav-dropdown-trigger="docs" role="button"
                            class="flex items-center justify-between px-4 py-2 pl-2 font-normal text-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }} transition-all cursor-pointer select-none lg:group-hover:opacity-75 lg-max:text-slate-700 ease-soft-in-out lg:px-2 text-size-sm">
                            Docs
                            <img src="{{ asset('assets') }}/img/down-arrow-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }}.svg"
                                alt="down-arrow" class="hidden ml-1 lg:block">
                            <img src="{{ asset('assets') }}/img/down-arrow-dark.svg" alt="down-arrow"
                                class="block ml-1 lg:hidden">
                        </a>


                        <div nav-dropdown="docs"
                            class=" lg:group-hover:pointer-events-auto lg:group-hover:transform-dropdown-show lg:group-hover:opacity-100 lg:group-hover:before:-top-4.8  sm-max:right-auto md-max:left-0 md-max:right-0 lg-max:bg-transparent lg-max:overflow-scroll lg-max:relative lg-max:shadow-none lg-max:transform-none lg-max:block lg-max:h-0 lg-max:transition-all lg-max:duration-350 lg-max:ease-soft lg-max:pt-0 lg-max:pb-0 lg-max:opacity-0 lg-max:top-0 lg-max:origin-top lg-max:pointer-events-none static p-4 m-0 mt-0 text-left list-none bg-white rounded-2xl lg:mt-4 lg:min-w-92 lg:absolute z-100 text-size-sm text-slate-500 bg-clip-padding lg:shadow-soft-3xl lg:cursor-pointer lg:transition-all lg:duration-250 lg:block lg:opacity-0 lg:top-0 lg:origin-top lg:pointer-events-none lg:transform-dropdown lg:before:font-awesome lg:before:content-['\f0d8'] lg:before:absolute lg:before:top-0 lg:before:left-7 lg:before:right-auto lg:before:text-5.5 lg:before:text-white lg:before:transition-all lg:before:duration-350 lg:before:ease-soft">
                            <div class="hidden lg:block">
                                <ul class="flex flex-col pl-0 mx-auto mb-0 list-none">
                                    <li class="relative block p-0 bg-white border-0 rounded-t-lg">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg hover:text-slate-700 hover:bg-gray-200 text-slate-500 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="https://www.creative-tim.com/learning-lab/tailwind/html/what-is-tailwind-css/soft-ui-dashboard/" target="_blank">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <svg class="text-slate-400" width="16px" height="16px"
                                                        viewBox="0 0 40 40" version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <title>spaceship</title>
                                                        <g stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <g transform="translate(-1720.000000, -592.000000)"
                                                                fill="#FFFFFF" fill-rule="nonzero">
                                                                <g transform="translate(1716.000000, 291.000000)">
                                                                    <g transform="translate(4.000000, 301.000000)">
                                                                        <path class="fill-slate-300"
                                                                            d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z">
                                                                        </path>
                                                                        <path class="fill-slate-300"
                                                                            d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z">
                                                                        </path>
                                                                        <path class="fill-slate-300"
                                                                            d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"
                                                                            opacity="0.598539807"></path>
                                                                        <path class="fill-slate-300"
                                                                            d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"
                                                                            opacity="0.598539807"></path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h6
                                                        class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                        Getting Started</h6>
                                                    <span class="leading-normal text-size-sm">All about overview, quick
                                                        start, license and contents</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="relative block p-0 bg-white border-0">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg hover:text-slate-700 hover:bg-gray-200 text-slate-500 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="javascript:;">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <svg class="text-slate-400" width="16px" height="16px"
                                                        viewBox="0 0 40 44" version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <title>document</title>
                                                        <g stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <g transform="translate(-1870.000000, -591.000000)"
                                                                fill="#FFFFFF" fill-rule="nonzero">
                                                                <g transform="translate(1716.000000, 291.000000)">
                                                                    <g transform="translate(154.000000, 300.000000)">
                                                                        <path class="fill-slate-300"
                                                                            d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                                                            opacity="0.603585379"></path>
                                                                        <path class="fill-slate-300"
                                                                            d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                                                                        </path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h6
                                                        class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                        Foundation</h6>
                                                    <span class="leading-normal text-size-sm">See our colors, icons and
                                                        typography</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="relative block p-0 bg-white border-0">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg hover:text-slate-700 hover:bg-gray-200 text-slate-500 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="https://www.creative-tim.com/learning-lab/tailwind/html/alert/soft-ui-dashboard/" target="_blank">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <svg class="text-slate-400" width="16px" height="16px"
                                                        viewBox="0 0 42 42" version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <title>box-3d-50</title>
                                                        <g stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <g transform="translate(-2319.000000, -291.000000)"
                                                                fill="#FFFFFF" fill-rule="nonzero">
                                                                <g transform="translate(1716.000000, 291.000000)">
                                                                    <g transform="translate(603.000000, 0.000000)">
                                                                        <path class="fill-slate-300"
                                                                            d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                                                                        </path>
                                                                        <path class="fill-slate-300"
                                                                            d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                                                            opacity="0.7"></path>
                                                                        <path class="fill-slate-300"
                                                                            d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                                                            opacity="0.7"></path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h6
                                                        class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                        Components</h6>
                                                    <span class="leading-normal text-size-sm">Explore our collection of
                                                        fully designed components</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="relative block p-0 bg-white border-0">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg hover:text-slate-700 hover:bg-gray-200 text-slate-500 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="https://www.creative-tim.com/learning-lab/tailwind/html/charts/soft-ui-dashboard/" target="_blank">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <svg class="text-slate-400" width="16px" height="16px"
                                                        viewBox="0 0 40 44" version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <title>switches</title>
                                                        <g stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <g transform="translate(-1870.000000, -440.000000)"
                                                                fill="#FFFFFF" fill-rule="nonzero">
                                                                <g transform="translate(1716.000000, 291.000000)">
                                                                    <g transform="translate(154.000000, 149.000000)">
                                                                        <path class="fill-slate-300"
                                                                            d="M10,20 L30,20 C35.4545455,20 40,15.4545455 40,10 C40,4.54545455 35.4545455,0 30,0 L10,0 C4.54545455,0 0,4.54545455 0,10 C0,15.4545455 4.54545455,20 10,20 Z M10,3.63636364 C13.4545455,3.63636364 16.3636364,6.54545455 16.3636364,10 C16.3636364,13.4545455 13.4545455,16.3636364 10,16.3636364 C6.54545455,16.3636364 3.63636364,13.4545455 3.63636364,10 C3.63636364,6.54545455 6.54545455,3.63636364 10,3.63636364 Z"
                                                                            opacity="0.6"></path>
                                                                        <path class="fill-slate-300"
                                                                            d="M30,23.6363636 L10,23.6363636 C4.54545455,23.6363636 0,28.1818182 0,33.6363636 C0,39.0909091 4.54545455,43.6363636 10,43.6363636 L30,43.6363636 C35.4545455,43.6363636 40,39.0909091 40,33.6363636 C40,28.1818182 35.4545455,23.6363636 30,23.6363636 Z M30,40 C26.5454545,40 23.6363636,37.0909091 23.6363636,33.6363636 C23.6363636,30.1818182 26.5454545,27.2727273 30,27.2727273 C33.4545455,27.2727273 36.3636364,30.1818182 36.3636364,33.6363636 C36.3636364,37.0909091 33.4545455,40 30,40 Z">
                                                                        </path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h6
                                                        class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                        Plugins</h6>
                                                    <span class="leading-normal text-size-sm">Check how you can
                                                        integrate
                                                        our plugins</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="relative block p-0 bg-white border-0 rounded-b-lg">
                                        <a class="block clear-both w-full px-4 py-2 font-normal bg-transparent border-0 rounded-lg hover:text-slate-700 hover:bg-gray-200 text-slate-500 text-align-inherit whitespace-nowrap lg:transition-colors lg:duration-300 lg:ease-soft"
                                            href="javascript:;">
                                            <div class="flex">
                                                <div
                                                    class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                    <svg class="text-slate-400" width="16px" height="16px"
                                                        viewBox="0 0 40 40" version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <title>settings</title>
                                                        <g stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <g transform="translate(-2020.000000, -442.000000)"
                                                                fill="#FFFFFF" fill-rule="nonzero">
                                                                <g transform="translate(1716.000000, 291.000000)">
                                                                    <g transform="translate(304.000000, 151.000000)">
                                                                        <polygon class="fil-slate-300"
                                                                            opacity="0.596981957"
                                                                            points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                                                                        </polygon>
                                                                        <path class="fill-slate-300"
                                                                            d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                                                                            opacity="0.596981957"></path>
                                                                        <path class="fill-slate-300"
                                                                            d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                                                                        </path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h6
                                                        class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                        Utility Classes</h6>
                                                    <span class="leading-normal text-size-sm">For those who want
                                                        flexibility, use our utility classes</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <div class="flex flex-wrap -mx-3 lg:hidden">
                                <div class="w-full max-w-full p-0 shrink-0 md:flex-0 md:w-full">
                                    <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg"
                                        href="https://www.creative-tim.com/learning-lab/tailwind/html/what-is-tailwind-css/soft-ui-dashboard/" target="_blank">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                <svg class="text-slate-400" width="16px" height="16px"
                                                    viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <title>spaceship</title>
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g transform="translate(-1720.000000, -592.000000)"
                                                            fill="#FFFFFF" fill-rule="nonzero">
                                                            <g transform="translate(1716.000000, 291.000000)">
                                                                <g transform="translate(4.000000, 301.000000)">
                                                                    <path class="fill-slate-300"
                                                                        d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z">
                                                                    </path>
                                                                    <path class="fill-slate-300"
                                                                        d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z">
                                                                    </path>
                                                                    <path class="fill-slate-300"
                                                                        d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"
                                                                        opacity="0.598539807"></path>
                                                                    <path class="fill-slate-300"
                                                                        d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"
                                                                        opacity="0.598539807"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div>
                                                <h6
                                                    class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                    Getting Started</h6>
                                                <span class="leading-normal text-size-sm">All about overview, quick
                                                    start,
                                                    license and contents</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg"
                                        href="javascript:;">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                <svg class="text-slate-400" width="16px" height="16px"
                                                    viewBox="0 0 40 44" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <title>document</title>
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g transform="translate(-1870.000000, -591.000000)"
                                                            fill="#FFFFFF" fill-rule="nonzero">
                                                            <g transform="translate(1716.000000, 291.000000)">
                                                                <g transform="translate(154.000000, 300.000000)">
                                                                    <path class="fill-slate-300"
                                                                        d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                                                        opacity="0.603585379"></path>
                                                                    <path class="fill-slate-300"
                                                                        d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                                                                    </path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div>
                                                <h6
                                                    class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                    Foundation</h6>
                                                <span class="leading-normal text-size-sm">See our colors, icons and
                                                    typography</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg"
                                        href="https://www.creative-tim.com/learning-lab/tailwind/html/alert/soft-ui-dashboard/" target="_blank">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                <svg class="text-slate-400" width="16px" height="16px"
                                                    viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <title>box-3d-50</title>
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g transform="translate(-2319.000000, -291.000000)"
                                                            fill="#FFFFFF" fill-rule="nonzero">
                                                            <g transform="translate(1716.000000, 291.000000)">
                                                                <g transform="translate(603.000000, 0.000000)">
                                                                    <path class="fill-slate-300"
                                                                        d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                                                                    </path>
                                                                    <path class="fill-slate-300"
                                                                        d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                                                                        opacity="0.7"></path>
                                                                    <path class="fill-slate-300"
                                                                        d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                                                                        opacity="0.7"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div>
                                                <h6
                                                    class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                    Components</h6>
                                                <span class="leading-normal text-size-sm">Explore our collection of
                                                    fully
                                                    designed components</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg"
                                        href="https://www.creative-tim.com/learning-lab/tailwind/html/charts/soft-ui-dashboard/" target="_blank">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                <svg class="text-slate-400" width="16px" height="16px"
                                                    viewBox="0 0 40 44" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <title>switches</title>
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g transform="translate(-1870.000000, -440.000000)"
                                                            fill="#FFFFFF" fill-rule="nonzero">
                                                            <g transform="translate(1716.000000, 291.000000)">
                                                                <g transform="translate(154.000000, 149.000000)">
                                                                    <path class="fill-slate-300"
                                                                        d="M10,20 L30,20 C35.4545455,20 40,15.4545455 40,10 C40,4.54545455 35.4545455,0 30,0 L10,0 C4.54545455,0 0,4.54545455 0,10 C0,15.4545455 4.54545455,20 10,20 Z M10,3.63636364 C13.4545455,3.63636364 16.3636364,6.54545455 16.3636364,10 C16.3636364,13.4545455 13.4545455,16.3636364 10,16.3636364 C6.54545455,16.3636364 3.63636364,13.4545455 3.63636364,10 C3.63636364,6.54545455 6.54545455,3.63636364 10,3.63636364 Z"
                                                                        opacity="0.6"></path>
                                                                    <path class="fill-slate-300"
                                                                        d="M30,23.6363636 L10,23.6363636 C4.54545455,23.6363636 0,28.1818182 0,33.6363636 C0,39.0909091 4.54545455,43.6363636 10,43.6363636 L30,43.6363636 C35.4545455,43.6363636 40,39.0909091 40,33.6363636 C40,28.1818182 35.4545455,23.6363636 30,23.6363636 Z M30,40 C26.5454545,40 23.6363636,37.0909091 23.6363636,33.6363636 C23.6363636,30.1818182 26.5454545,27.2727273 30,27.2727273 C33.4545455,27.2727273 36.3636364,30.1818182 36.3636364,33.6363636 C36.3636364,37.0909091 33.4545455,40 30,40 Z">
                                                                    </path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div>
                                                <h6
                                                    class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                    Plugins</h6>
                                                <span class="leading-normal text-size-sm">Check how you can integrate
                                                    our
                                                    plugins</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="hover:text-slate-700 hover:bg-gray-200 block w-full px-4 py-1.2 clear-both font-normal text-slate-500 text-align-inherit whitespace-nowrap bg-transparent border-0 lg:transition-colors lg:duration-300 lg:ease-soft rounded-lg"
                                        href="javascript:;">
                                        <div class="flex">
                                            <div
                                                class="flex mt-1 mr-4 text-black fill-current h-4-em w-4-em stroke-none">
                                                <svg class="text-slate-400" width="16px" height="16px"
                                                    viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <title>settings</title>
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g transform="translate(-2020.000000, -442.000000)"
                                                            fill="#FFFFFF" fill-rule="nonzero">
                                                            <g transform="translate(1716.000000, 291.000000)">
                                                                <g transform="translate(304.000000, 151.000000)">
                                                                    <polygon class="fil-slate-300" opacity="0.596981957"
                                                                        points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                                                                    </polygon>
                                                                    <path class="fill-slate-300"
                                                                        d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                                                                        opacity="0.596981957"></path>
                                                                    <path class="fill-slate-300"
                                                                        d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                                                                    </path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div>
                                                <h6
                                                    class="flex p-0 mb-0 font-bold text-size-sm whitespace-nowrap text-slate-700">
                                                    Utility Classes</h6>
                                                <span class="leading-normal text-size-sm">All about overview, quick
                                                    start,
                                                    license and contents</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                @endauth

                @guest
                <ul class="flex flex-col pl-0 mx-auto mb-0 list-none md-max:w-full lg:flex-row">
                    <li
                        class="relative mx-2 group md-max:static lg:after:content-[''] lg:after:top-0 lg:hover:after:top-full lg:after:absolute lg:after:left-0 lg:after:-bottom-6 lg:after:w-full lg:after:h-full">

                        <a href="{{ route('login') }}" role="button"
                            class="flex items-center justify-between px-4 py-2 pl-2 font-normal text-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }} transition-all cursor-pointer select-none lg:group-hover:opacity-75 lg-max:text-slate-700 ease-soft-in-out lg:px-2 text-size-sm">
                            Sign In
                        </a>
                    </li>
                    <li
                        class="relative mx-2 group md-max:static lg:after:content-[''] lg:after:top-0 lg:hover:after:top-full lg:after:absolute lg:after:left-0 lg:after:-bottom-6 lg:after:w-full lg:after:h-full">

                        <a href="{{ route('register') }}" role="button"
                            class="flex items-center justify-between px-4 py-2 pl-2 font-normal text-{{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'dark' : 'white' }} transition-all cursor-pointer select-none lg:group-hover:opacity-75 lg-max:text-slate-700 ease-soft-in-out lg:px-2 text-size-sm">
                            Sign Up
                        </a>
                    </li>
                </ul>
                @endguest

                <ul class="hidden pl-0 mb-0 list-none lg:block lg:flex-row">
                    <li>
                        <a href="javascript:;"
                            {{-- class="inline-block px-8 py-2 mb-0 mr-1 font-bold text-center uppercase align-middle bg-white border-0 cursor-pointer text-size-xs leading-pro text-slate-500 tracking-tight-soft shadow-soft-md bg-150 bg-x-25 rounded-7 {{ in_array(request()->route()->getName(),getCategoriesArray('guest-dark')) ? 'text-white bg-gradient-fuchsia' : '' }}">Buy --}}
                             class="inline-block px-8 py-2 mb-0 mr-1 font-bold text-center uppercase align-middle bg-white border-0 cursor-pointer text-size-xs leading-pro text-slate-500 tracking-tight-soft shadow-soft-md bg-150 bg-x-25 rounded-7 text-white bg-gradient-fuchsia">Buy
                             Now</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>