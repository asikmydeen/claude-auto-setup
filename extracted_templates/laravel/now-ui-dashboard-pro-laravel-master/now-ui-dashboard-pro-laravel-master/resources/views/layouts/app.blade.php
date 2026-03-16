{{--

=========================================================
* Now Ui Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nowui-dashboard-pro-laravel
* Copyright 2018 Creative Tim (https://www.creative-tim.com) & UPDIVISION (https://www.updivision.com)

* Coded by www.creative-tim.com & www.updivision.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

--}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @if (config('app.is_demo'))
        <!-- Anti-flicker snippet (recommended)  -->
        <style>.async-hide { opacity: 0 !important} </style>
        <script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
        h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
        (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
        })(window,document.documentElement,'async-hide','dataLayer',4000,
        {'GTM-K9BGS8K':true});</script>

        <!-- Analytics-Optimize Snippet -->
        <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-46172202-22', 'auto', {allowLinker: true});
        ga('set', 'anonymizeIp', true);
        ga('require', 'GTM-K9BGS8K');
        ga('require', 'displayfeatures');
        ga('require', 'linker');
        ga('linker:autoLink', ["2checkout.com","avangate.com"]);
        </script>
        <!-- end Analytics-Optimize Snippet -->

        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NKDMSK6');</script>
        <!-- End Google Tag Manager -->
         <!-- Extra details for Live View on GitHub Pages -->
    <!-- Canonical SEO -->
    <link rel="canonical" href="https://www.creative-tim.com/product/now-ui-dashboard-pro" />


    <!--  Social tags      -->
    <meta name="keywords" content="creative tim, html dashboard, html css dashboard, web dashboard, bootstrap 4 dashboard, bootstrap 4, css3 dashboard, bootstrap 4 admin, now ui dashboard bootstrap 4 dashboard, frontend, responsive bootstrap 4 dashboard, now ui design, now ui dashboard bootstrap 4 dashboard">
    <meta name="description" content="Now UI Dashboard PRO is a beautiful Bootstrap 4 admin dashboard with a large number of components, designed to look beautiful, clean and organized. If you are looking for a tool to manage dates about your business, this dashboard is the thing for you.">


    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="Now Ui Dashboard PRO by Creative Tim">
    <meta itemprop="description" content="Now UI Dashboard PRO is a beautiful Bootstrap 4 admin dashboard with a large number of components, designed to look beautiful, clean and organized. If you are looking for a tool to manage dates about your business, this dashboard is the thing for you.">

    <meta itemprop="image" content="https://s3.amazonaws.com/creativetim_bucket/products/72/opt_nudp_thumbnail.jpg">


    <!-- Twitter Card data -->
    <meta name="twitter:card" content="product">
    <meta name="twitter:site" content="@creativetim">
    <meta name="twitter:title" content="Now Ui Dashboard PRO by Creative Tim">

    <meta name="twitter:description" content="Now UI Dashboard PRO is a beautiful Bootstrap 4 admin dashboard with a large number of components, designed to look beautiful, clean and organized. If you are looking for a tool to manage dates about your business, this dashboard is the thing for you.">
    <meta name="twitter:creator" content="@creativetim">
    <meta name="twitter:image" content="https://s3.amazonaws.com/creativetim_bucket/products/72/opt_nudp_thumbnail.jpg">


    <!-- Open Graph data -->
    <meta property="fb:app_id" content="655968634437471">
    <meta property="og:title" content="Now Ui Dashboard PRO by Creative Tim" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="http://demos.creative-tim.com/now-ui-dashboard-pro/examples/dashboard.html" />
    <meta property="og:image" content="https://s3.amazonaws.com/creativetim_bucket/products/72/opt_nudp_thumbnail.jpg" />
    <meta property="og:description" content="Now UI Dashboard PRO is a beautiful Bootstrap 4 admin dashboard with a large number of components, designed to look beautiful, clean and organized. If you are looking for a tool to manage dates about your business, this dashboard is the thing for you."
    />
    <meta property="og:site_name" content="Creative Tim" />
    @endif
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{__(" Now UI Dashboard PRO Laravel")}}</title>
    <link rel="icon" type="image/png" href="{{ asset('now') }}/img/favicon.png">
    <!-- Favicon -->
    <link href="{{ asset('now') }}/img/brand/favicon.png" rel="icon" type="image/png">
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link href="{{ asset('now') }}/demo/demo.css" rel="stylesheet" />

    <!-- Bootstrap -->
    <link type="text/css" href="{{ asset('now') }}/css/bootstrap-tourist.css" rel="stylesheet">
    <link type="text/css" href="{{ asset('now') }}/css/bootstrap.min.css?v=1.0.0" rel="stylesheet">

    <!-- Now UI Dashboard CSS -->
    {{-- <link type="text/css" href="{{ asset('now')}}/css/now-ui-dashboard.min.css" rel="stylesheet"> --}}
    <link type="text/css" href="{{ asset('css')}}/now-ui-dashboard.css" rel="stylesheet">
</head>
<body class="{{ $class ?? '' }}">
    @if (config('app.is_demo'))
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKDMSK6"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    @endif
    <div class="wrapper">
        @auth
            <div class="fixed-plugin">
                    <div class="dropdown show-dropdown">
                        <a href="#" data-toggle="dropdown">
                        <i class="fa fa-cog fa-2x"> </i>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header-title"> Sidebar Background</li>
                            <li class="adjustments-line">
                                <a href="javascript:void(0)" class="switch-trigger background-color">
                                    <div class="badge-colors text-center">
                                        <span class="badge filter badge-yellow" data-color="yellow"></span>
                                        <span class="badge filter badge-blue" data-color="blue"></span>
                                        <span class="badge filter badge-green" data-color="green"></span>
                                        <span class="badge filter badge-orange active" data-color="orange"></span>
                                        <span class="badge filter badge-red" data-color="red"></span>
                                    </div>
                                    <div class="clearfix"></div>
                                </a>
                            </li>


                            <li class="header-title">
                                Sidebar Mini
                            </li>
                            <li class="adjustments-line">

                              <div class="togglebutton switch-sidebar-mini">
                                <span class="label-switch">OFF</span>
                                <input type="checkbox" name="checkbox" class="bootstrap-switch"
                                  data-on-label=""
                                  data-off-label=""
                                  />
                                <span class="label-switch label-right">ON</span>
                              </div>
                            </li>

                            <li class="button-container">
                                <a href="https://www.creative-tim.com/product/now-ui-dashboard-pro-laravel" target="_blank" class="btn btn-primary btn-block btn-round">Buy Now</a>
                                <a href="https://now-ui-dashboard-pro-laravel.creative-tim.com/docs/getting-started/laravel-setup.html" target="_blank" class="btn btn-default btn-block btn-round">
                                    <i class="now-ui-icons files_single-copy-04"></i>
                                    Documentation
                                </a>
                            </li>




                            <li class="header-title">Thank you for 95 shares!</li>

                            <li class="button-container text-center">
                                <button id="twitter" class="btn btn-round btn-info"><i class="fab fa-twitter"></i> &middot; 45</button>
                                <button id="facebook" class="btn btn-round btn-info"><i class="fab fa-facebook-f"></i> &middot; 50</button>
                                <br>
                                <br>
                                <a class="github-button" target="_blank" href="https://github.com/creativetimofficial/ct-now-ui-dashboard-pro" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star ntkme/github-buttons on GitHub">Star</a>
                            </li>
                        </ul>
                    </div>
                </div>
            @endauth
            @if (auth()->check() && !in_array(request()->route()->getName(), ['welcome', 'page.pricing', 'page.lock', 'page.error']))
                @include('layouts.page_template.auth')
            @else
                @include('layouts.page_template.guest')
            @endif
    </div>
    <!--   Core JS Files   -->
    <script src="{{ asset('now') }}/js/core/jquery.min.js"></script>
    <script src="{{ asset('now') }}/js/core/popper.min.js"></script>
    <script src="{{ asset('now') }}/js/core/bootstrap.min.js"></script>
    <script src="{{ asset('now') }}/js/plugins/perfect-scrollbar.jquery.min.js"></script>
    <script src="{{ asset('now') }}/js/plugins/moment.min.js"></script>
        <!--  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ -->
    <script src="{{ asset('now') }}/js/plugins/bootstrap-switch.js"></script>
    <!--  Plugin for Sweet Alert -->
    <script src="{{ asset('now') }}/js/plugins/sweetalert2.min.js"></script>
    <!--  Plugin for Sweet Alert -->
    <script src="{{ asset('now') }}/js/plugins/jquery.validate.min.js"></script>
    <!--  Plugin for the Wizard, full documentation here: https://github.com/VinceG/twitter-bootstrap-wizard -->
    <script src="{{ asset('now') }}/js/plugins/jquery.bootstrap-wizard.js"></script>
    <!--	Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select -->
    <script src="{{ asset('now') }}/js/plugins/bootstrap-selectpicker.js"></script>
    <!--  Plugin for the DateTimePicker, full documentation here: https://eonasdan.github.io/bootstrap-datetimepicker/ -->
    <script src="{{ asset('now') }}/js/plugins/bootstrap-datetimepicker.js"></script>
    <script src="{{ asset('now') }}/js/plugins/jquery.dataTables.min.js"></script>
    <!--	Plugin for Tags, full documentation here: https://github.com/bootstrap-tagsinput/bootstrap-tagsinputs  -->
    <script src="{{ asset('now') }}/js/plugins/bootstrap-tagsinput.js"></script>
    <!--	Plugin for Bootstrap Tourist, full documentation here: https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist  -->
    <script src="{{ asset('now') }}/js/plugins/bootstrap-tourist.js"></script>
    <!-- Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
    <script src="{{ asset('now') }}/js/plugins/jasny-bootstrap.min.js"></script>
    <!--  Full Calendar Plugin, full documentation here: https://github.com/fullcalendar/fullcalendar    -->
    <script src="{{ asset('now') }}/js/plugins/fullcalendar.min.js"></script>
    <!-- Vector Map plugin, full documentation here: http://jvectormap.com/documentation/ -->
    <script src="{{ asset('now') }}/js/plugins/jquery-jvectormap.js"></script>
    <!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
    <script src="{{ asset('now') }}/js/plugins/nouislider.min.js"></script>
    <!--  Google Maps Plugin    -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbVUXb1ZCXDbVu5V-0AjxpikPl6jmgpbQ"></script>
    <!-- Chart JS -->
    <script src="{{ asset('now') }}/js/plugins/chartjs.min.js"></script>
    <!--  Notifications Plugin    -->
    <script src="{{ asset('now') }}/js/plugins/bootstrap-notify.js"></script>
    <!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="{{ asset('now') }}/js/now-ui-dashboard.js?v=1.4.1"></script>
    <!-- JS Just for demo purpose, don't include it in your project -->
    <script src="{{asset('now')}}/demo/demo.js?v=1.0"></script>
    @if (config('app.is_demo'))
        <script src="{{asset('now')}}/demo/tour.js?v=1.1"></script>
    @endif
    <!-- Sharrre libray -->
    <script src="{{asset('now')}}/demo/jquery.sharrre.js"></script>

    <script>
    $(document).ready(function(){
        @if (session('status'))
            $.notify({
            icon: "done",
            message: "{{ session('status') }}"
            }, {
            type: 'success',
            timer: 3000,
            placement: {
                from: 'top',
                align: 'right'
            }
            });
        @endif

        @if (session('info'))
            $.notify({
            icon: "done",
            message: "{{ session('info') }}"
            }, {
            type: 'info',
            timer: 3000,
            placement: {
                from: 'top',
                align: 'right'
            }
            });
    @endif

    $('#facebook').sharrre({
        share: {
            facebook: true
        },
        enableHover: false,
        enableTracking: false,
        enableCounter: false,
        click: function(api, options){
            api.simulateClick();
            api.openPopup('facebook');
        },
        template: '<i class="fab fa-facebook-f"></i> Facebook',
        url: 'https://demos.creative-tim.com/now-ui-dashboard-pro/examples/dashboard.html'
        });
            $('#google').sharrre({
        share: {
            googlePlus: true
        },
        enableCounter: false,
        enableHover: false,
        enableTracking: true,
        click: function(api, options){
            api.simulateClick();
            api.openPopup('googlePlus');
        },
        template: '<i class="fab fa-google-plus"></i> Google',
        url: 'https://demos.creative-tim.com/now-ui-dashboard-pro/examples/dashboard.html'
        });
            $('#twitter').sharrre({
        share: {
            twitter: true
        },
        enableHover: false,
        enableTracking: false,
        enableCounter: false,
        buttons: { twitter: {via: 'CreativeTim'}},
        click: function(api, options){
            api.simulateClick();
            api.openPopup('twitter');
        },
        template: '<i class="fab fa-twitter"></i> Twitter',
        url: 'https://demos.creative-tim.com/now-ui-dashboard-pro/examples/dashboard.html'
        });
        });
    </script>
    <script>
        $(document).ready(function(){
            $().ready(function(){
                $sidebar = $('.sidebar');
                $sidebar_img_container = $sidebar.find('.sidebar-background');
                $full_page = $('.full-page');
                $sidebar_responsive = $('body > .navbar-collapse');
                sidebar_mini_active = false;
                window_width = $(window).width();
                fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();
                // if( window_width > 767 && fixed_plugin_open == 'Dashboard' ){
                //     if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
                //         $('.fixed-plugin .dropdown').addClass('show');
                //     }
                //
                // }
                $('.fixed-plugin a').click(function(event){
                    // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
                    if($(this).hasClass('switch-trigger')){
                        if(event.stopPropagation){
                            event.stopPropagation();
                        }
                        else if(window.event){
                            window.event.cancelBubble = true;
                        }
                    }
                });
                $('.fixed-plugin .background-color span').click(function(){
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var new_color = $(this).data('color');
                    if($sidebar.length != 0){
                        $sidebar.attr('data-color',new_color);
                    }
                    if($full_page.length != 0){
                        $full_page.attr('filter-color',new_color);
                    }
                    if($sidebar_responsive.length != 0){
                        $sidebar_responsive.attr('data-color',new_color);
                    }
                });
                $('.fixed-plugin .img-holder').click(function(){
                    $full_page_background = $('.full-page-background');
                    $(this).parent('li').siblings().removeClass('active');
                    $(this).parent('li').addClass('active');
                    var new_image = $(this).find("img").attr('src');
                    if( $sidebar_img_container.length !=0 && $('.switch-sidebar-image input:checked').length != 0 ){
                        $sidebar_img_container.fadeOut('fast', function(){
                            $sidebar_img_container.css('background-image','url("' + new_image + '")');
                            $sidebar_img_container.fadeIn('fast');
                        });
                    }
                    if($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0 ) {
                        var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');
                        $full_page_background.fadeOut('fast', function(){
                            $full_page_background.css('background-image','url("' + new_image_full_page + '")');
                            $full_page_background.fadeIn('fast');
                        });
                    }
                    if( $('.switch-sidebar-image input:checked').length == 0 ){
                        var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
                        var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');
                        $sidebar_img_container.css('background-image','url("' + new_image + '")');
                        $full_page_background.css('background-image','url("' + new_image_full_page + '")');
                    }
                    if($sidebar_responsive.length != 0){
                        $sidebar_responsive.css('background-image','url("' + new_image + '")');
                    }
                });
                $('.switch-sidebar-image input').on("switchChange.bootstrapSwitch", function(){
                    $full_page_background = $('.full-page-background');
                    $input = $(this);
                    if($input.is(':checked')){
                        if($sidebar_img_container.length != 0){
                            $sidebar_img_container.fadeIn('fast');
                            $sidebar.attr('data-image','#');
                        }
                        if($full_page_background.length != 0){
                            $full_page_background.fadeIn('fast');
                            $full_page.attr('data-image','#');
                        }
                        background_image = true;
                    } else {
                        if($sidebar_img_container.length != 0){
                            $sidebar.removeAttr('data-image');
                            $sidebar_img_container.fadeOut('fast');
                        }
                        if($full_page_background.length != 0){
                            $full_page.removeAttr('data-image','#');
                            $full_page_background.fadeOut('fast');
                        }
                        background_image = false;
                    }
                });
                $('.switch-sidebar-mini input').on("switchChange.bootstrapSwitch", function(){
                    var $btn = $(this);
                    if(sidebar_mini_active == true){
                        $('body').removeClass('sidebar-mini');
                        sidebar_mini_active = false;
                        nowuiDashboard.showSidebarMessage('Sidebar mini deactivated...');
                    }else{
                        $('body').addClass('sidebar-mini');
                        sidebar_mini_active = true;
                        nowuiDashboard.showSidebarMessage('Sidebar mini activated...');
                    }
                    // we simulate the window Resize so the charts will get updated in realtime.
                    var simulateWindowResize = setInterval(function(){
                        window.dispatchEvent(new Event('resize'));
                    },180);
                    // we stop the simulation of Window Resize after the animations are completed
                    setTimeout(function(){
                        clearInterval(simulateWindowResize);
                    },1000);
                });
            });
        });
    </script>
    @stack('js')
</body>
</html>
