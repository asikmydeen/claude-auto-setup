<div class="sidebar" data-color="brown" data-active-color="danger">
    <!--
    Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
    -->
    <div class="logo">
        <a href="http://www.creative-tim.com" class="simple-text logo-mini">
            <div class="logo-image-small">
                <img src="{{ asset('img/logo-small.png') }}">
            </div>
        </a>
        <a href="http://www.creative-tim.com" class="simple-text logo-normal">
            {{ __('Creative Tim') }}
        </a>
    </div>
    <div class="sidebar-wrapper">
        <div class="user">
            <div class="photo">
                @if (isset(auth()->user()->picture))
                    <img src="{{ asset(auth()->user()->picture) }}">
                @else
                    <img class="avatar border-gray" src="{{ asset('img/No Profile Picture.png') }}" alt="...">
                @endif
            </div>
            <div class="info">
                <a data-toggle="collapse" href="#collapseExample" class="collapsed">
                    <span>
                        {{ auth()->user()->name }}
                    <b class="caret"></b>
                    </span>
                </a>
                <div class="clearfix"></div>
                <div class="collapse {{ $folderActive == 'profile' ? 'show' : '' }}" id="collapseExample">
                    <ul class="nav">
                        <li class="{{ $elementActive == 'edit-profile' ? 'active' : '' }}">
                            <a href="{{ route('profile.edit') }}">
                                <span class="sidebar-mini-icon">{{ __('MP') }}</span>
                                <span class="sidebar-normal">{{ __('My Profile') }}</span>
                            </a>
                        </li>
                        <li>
                            <form class="dropdown-item" action="{{ route('logout') }}" id="formLogOutSidebar" method="POST" style="display: none;">
                                @csrf
                            </form>
                            <a onclick="document.getElementById('formLogOutSidebar').submit();">
                                <span class="sidebar-mini-icon">{{ __('LO') }}</span>
                                <span class="sidebar-normal">{{ __('Log Out') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ul class="nav">
            <li class="{{ $elementActive == 'dashboard' ? 'active' : '' }}">
                <a href="{{ route('home') }}">
                    <i class="nc-icon nc-bank"></i>
                    <p>{{ __('Dashboard') }}</p>
                </a>
            </li>
            <li class="{{ $folderActive == 'laravel-examples' ? 'active' : '' }}">
                <a data-toggle="collapse" aria-expanded="true" href="#laravelExamples">
                    <i class="nc-icon"><img src="{{ asset('img/laravel.svg') }}"></i>
                    <p>
                            {{ __('Laravel examples') }}
                        <b class="caret"></b>
                    </p>
                </a>
                <div class="collapse show" id="laravelExamples">
                    <ul class="nav">
                        <li class="{{ $elementActive == 'profile' ? 'active' : '' }}">
                            <a href="{{ route('profile.edit') }}">
                                <span class="sidebar-mini-icon">{{ __('P') }}</span>
                                <span class="sidebar-normal">{{ __(' Profile ') }}</span>
                            </a>
                        </li>
                        @if (Auth::user()->role_id == 1)
                            <li class="{{ $elementActive == 'role' ? 'active' : '' }}">
                                <a href="{{ route('page.index', 'role') }}">
                                    <span class="sidebar-mini-icon">{{ __('R') }}</span>
                                    <span class="sidebar-normal">{{ __(' Role Management ') }}</span>
                                </a>
                            </li>
                        @endif
                        @if (Auth::user()->role_id == 1)
                            <li class="{{ $elementActive == 'user' ? 'active' : '' }}">
                                <a href="{{ route('page.index', 'user') }}">
                                    <span class="sidebar-mini-icon">{{ __('U') }}</span>
                                    <span class="sidebar-normal">{{ __(' User Management ') }}</span>
                                </a>
                            </li>
                        @endif
                        @if (Auth::user()->role_id <= 2)
                            <li class="{{ $elementActive == 'category' ? 'active' : '' }}">
                                <a href="{{ route('page.index', 'category') }}">
                                    <span class="sidebar-mini-icon">{{ __('C') }}</span>
                                    <span class="sidebar-normal">{{ __(' Category Management ') }}</span>
                                </a>
                            </li>
                        @endif
                        @if (Auth::user()->role_id <= 2)
                            <li class="{{ $elementActive == 'tag' ? 'active' : '' }}">
                                <a href="{{ route('page.index', 'tag') }}">
                                    <span class="sidebar-mini-icon">{{ __('T') }}</span>
                                    <span class="sidebar-normal">{{ __(' Tag Management ') }}</span>
                                </a>
                            </li>
                        @endif
                        <li class="{{ $elementActive == 'item' ? 'active' : '' }}">
                            <a href="{{ route('page.index', 'item') }}">
                                <span class="sidebar-mini-icon">{{ __('I') }}</span>
                                <span class="sidebar-normal">{{ __(' Item Management ') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="{{ $folderActive == 'pages' ? 'active' : '' }}">
                <a data-toggle="collapse" href="#pagesExamples" aria-expanded="{{ $folderActive == 'pages' ? 'true' : '' }}">
                    <i class="nc-icon nc-book-bookmark"></i>
                    <p>
                            {{ __('Pages') }}
                        <b class="caret"></b>
                    </p>
                </a>
                <div class="collapse {{ $folderActive == 'pages' ? 'show' : '' }}" id="pagesExamples">
                    <ul class="nav">
                        <li class="{{ $elementActive == 'timeline' ? 'active' : '' }}">
                            <a href="{{ route('page.index', 'timeline') }}">
                                <span class="sidebar-mini-icon">{{ __('T') }}</span>
                                <span class="sidebar-normal">{{ __(' Timeline ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'user-profile' ? 'active' : '' }}">
                            <a href="{{ route('profile.edit') }}">
                                <span class="sidebar-mini-icon">{{ __('UP') }}</span>
                                <span class="sidebar-normal">{{ __(' User Profile ') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="{{ $folderActive == 'components' ? 'active' : '' }}">
                <a data-toggle="collapse" href="#componentsExamples" aria-expanded="{{ $folderActive == 'components' ? 'true' : '' }}">
                    <i class="nc-icon nc-layout-11"></i>
                    <p>
                            {{ __('Components') }}
                        <b class="caret"></b>
                    </p>
                </a>
                <div class="collapse {{ $folderActive == 'components' ? 'show' : '' }}" id="componentsExamples">
                    <ul class="nav">
                        <li class="{{ $elementActive == 'buttons' ? 'active' : '' }}">
                            <a href="{{ route('page.components', 'buttons') }}">
                                <span class="sidebar-mini-icon">{{ __('B') }}</span>
                                <span class="sidebar-normal">{{ __(' Buttons ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'grid' ? 'active' : '' }}">
                            <a href="{{ route('page.components', 'grid') }}">
                                <span class="sidebar-mini-icon">{{ __('G') }}</span>
                                <span class="sidebar-normal">{{ __(' Grid System ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'panels' ? 'active' : '' }}">
                            <a href="{{ route('page.components', 'panels') }}">
                                <span class="sidebar-mini-icon">{{ __('P') }}</span>
                                <span class="sidebar-normal">{{ __(' Panels ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'sweet-alert' ? 'active' : '' }}">
                            <a href="{{ route('page.components', 'sweet-alert') }}">
                                <span class="sidebar-mini-icon">{{ __('SA') }}</span>
                                <span class="sidebar-normal">{{ __(' Sweet Alert ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'notifications' ? 'active' : '' }}">
                            <a href="{{ route('page.components', 'notifications') }}">
                                <span class="sidebar-mini-icon">{{ __('N') }}</span>
                                <span class="sidebar-normal">{{ __(' Notifications ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'icons' ? 'active' : '' }}">
                            <a href="{{ route('page.components', 'icons') }}">
                                <span class="sidebar-mini-icon">{{ __('I') }}</span>
                                <span class="sidebar-normal">{{ __(' Icons ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'typography' ? 'active' : '' }}">
                            <a href="{{ route('page.components', 'typography') }}">
                                <span class="sidebar-mini-icon">{{ __('T') }}</span>
                                <span class="sidebar-normal">{{ __(' Typography ') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="{{ $folderActive == 'forms' ? 'active' : '' }}">
                <a data-toggle="collapse" href="#formsExamples" aria-expanded="{{ $folderActive == 'forms' ? 'true' : '' }}">
                    <i class="nc-icon nc-ruler-pencil"></i>
                    <p>
                            {{ __('Forms') }}
                        <b class="caret"></b>
                    </p>
                </a>
                <div class="collapse {{ $folderActive == 'forms' ? 'show' : '' }}" id="formsExamples">
                    <ul class="nav">
                        <li class="{{ $elementActive == 'regular-forms' ? 'active' : '' }}">
                            <a href="{{ route('page.forms', 'regular') }}">
                                <span class="sidebar-mini-icon">{{ __('RF') }}</span>
                                <span class="sidebar-normal">{{ __(' Regular Forms ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'extended-forms' ? 'active' : '' }}">
                            <a href="{{ route('page.forms', 'extended') }}">
                                <span class="sidebar-mini-icon">{{ __('EF') }}</span>
                                <span class="sidebar-normal">{{ __(' Extended Forms ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'validation' ? 'active' : '' }}">
                            <a href="{{ route('page.forms', 'validation') }}">
                                <span class="sidebar-mini-icon">{{ __('V') }}</span>
                                <span class="sidebar-normal">{{ __(' Validation Forms ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'wizard' ? 'active' : '' }}">
                            <a href="{{ route('page.forms', 'wizard') }}">
                                <span class="sidebar-mini-icon">{{ __('W') }}</span>
                                <span class="sidebar-normal">{{ __(' Wizard ') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="{{ $folderActive == 'tables' ? 'active' : '' }}">
                <a data-toggle="collapse" href="#tablesExamples" aria-expanded="{{ $folderActive == 'tables' ? 'true' : '' }}">
                    <i class="nc-icon nc-single-copy-04"></i>
                    <p>
                            {{ __('Tables') }}
                        <b class="caret"></b>
                    </p>
                </a>
                <div class="collapse {{ $folderActive == 'tables' ? 'show' : '' }}" id="tablesExamples">
                    <ul class="nav">
                        <li class="{{ $elementActive == 'regular-tables' ? 'active' : '' }}">
                            <a href="{{ route('page.tables', 'regular') }}">
                                <span class="sidebar-mini-icon">{{ __('RT') }}</span>
                                <span class="sidebar-normal">{{ __(' Regular Tables ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'extended-tables' ? 'active' : '' }}">
                            <a href="{{ route('page.tables', 'extended') }}">
                                <span class="sidebar-mini-icon">{{ __('ET') }}</span>
                                <span class="sidebar-normal">{{ __(' Extended Tables ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'datatables' ? 'active' : '' }}">
                            <a href="{{ route('page.tables', 'datatables') }}">
                                <span class="sidebar-mini-icon">{{ __('DT') }}</span>
                                <span class="sidebar-normal">{{ __(' DataTables.net ') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="{{ $folderActive == 'maps' ? 'active' : '' }}">
                <a data-toggle="collapse" href="#mapsExamples" aria-expanded="{{ $folderActive == 'maps' ? 'true' : '' }}">
                    <i class="nc-icon nc-pin-3"></i>
                    <p>
                            {{ __('Maps') }}
                        <b class="caret"></b>
                    </p>
                </a>
                <div class="collapse {{ $folderActive == 'maps' ? 'show' : '' }}" id="mapsExamples">
                    <ul class="nav">
                        <li class="{{ $elementActive == 'google' ? 'active' : '' }}">
                            <a href="{{ route('page.maps', 'google') }}">
                                <span class="sidebar-mini-icon">{{ __('GM') }}</span>
                                <span class="sidebar-normal">{{ __(' Google Maps ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'fullscreen' ? 'active' : '' }}">
                            <a href="{{ route('page.maps', 'fullscreen') }}">
                                <span class="sidebar-mini-icon">{{ __('FSM') }}</span>
                                <span class="sidebar-normal">{{ __(' Full Screen Map ') }}</span>
                            </a>
                        </li>
                        <li class="{{ $elementActive == 'vector' ? 'active' : '' }}">
                            <a href="{{ route('page.maps', 'vector') }}">
                                <span class="sidebar-mini-icon">{{ __('VM') }}</span>
                                <span class="sidebar-normal">{{ __(' Vector Map ') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                </li>
            <li class="{{ $elementActive == 'widgets' ? 'active' : '' }}">
                <a href="{{ route('page.index', 'widgets') }}">
                    <i class="nc-icon nc-box"></i>
                    <p>{{ __('Widgets') }}</p>
                </a>
            </li>
            <li class="{{ $elementActive == 'charts' ? 'active' : '' }}">
                <a href="{{ route('page.index', 'charts') }}">
                    <i class="nc-icon nc-chart-bar-32"></i>
                    <p>{{ __('Charts') }}</p>
                </a>
            </li>
            <li class="{{ $elementActive == 'calendar' ? 'active' : '' }}">
                <a href="{{ route('page.index', 'calendar') }}">
                    <i class="nc-icon nc-calendar-60"></i>
                    <p>{{ __('Calendar') }}</p>
                </a>
            </li>
        </ul>
    </div>
</div>