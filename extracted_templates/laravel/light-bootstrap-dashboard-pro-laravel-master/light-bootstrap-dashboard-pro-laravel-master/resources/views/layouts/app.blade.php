{{--

=========================================================
* Argon Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-laravel
* Copyright 2018 Creative Tim (https://www.creative-tim.com) & UPDIVISION (https://www.updivision.com)

* Coded by www.creative-tim.com & www.updivision.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

--}}
<!DOCTYPE html>
<html lang="en">
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
    @endif
        <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('img/apple-icon.png') }}">
        <!-- Favicon -->
        <link rel="icon" type="image/png" href="{{ asset('img/favicon.ico') }}">
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}">    {{-- attach a token to any request for a js --}}

        <title>{{ __($title) }}</title>
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
        @if (config('app.is_demo'))
        <!-- Extra details for Live View on GitHub Pages -->
        <!-- Canonical SEO -->
        <link rel="canonical" href="https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-laravel" />

        <!--  Social tags      -->
        <meta name="keywords" content="design system, dashboard, bootstrap 4 dashboard, bootstrap 4 design, bootstrap 4 system, bootstrap 4, bootstrap 4 uit kit, bootstrap 4 kit, light bootstrap, light bootstrap dashboard, creative tim & UPDIVISION, updivision, html dashboard, html css template, web template, bootstrap, bootstrap 4, css3 template, frontend, responsive bootstrap template, bootstrap dashboard, responsive dashboard, laravel, laravel php, laravel php framework, free laravel admin template, free laravel admin, free laravel admin template + Front End + CRUD, crud laravel php, crud laravel, laravel backend admin dashboard">
        <meta name="description" content="Start your development with a premium Bootstrap 4 Admin Dashboard built for Laravel Framework 8.x and Up.">


        <!-- Schema.org markup for Google+ -->
        <meta itemprop="name" content="Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION">
        <meta itemprop="description" content="Start your development with premium a Bootstrap 4 Admin Dashboard built for Laravel Framework 8.x and Up.">

        <meta itemprop="image" content="https://s3.amazonaws.com/creativetim_bucket/products/212/original/opt_lbdp_laravel_thumbnail.jpg">


        <!-- Twitter Card data -->
        <meta name="twitter:card" content="product">
        <meta name="twitter:site" content="@creativetim">
        <meta name="twitter:title" content="Light Bootstrap Dashboard PRO Laravel] by Creative Tim & UPDIVISION">

        <meta name="twitter:description" content="Start your development with a premium Bootstrap 4 Admin Dashboard built for Laravel Framework 8.x and Up.">
        <meta name="twitter:creator" content="@creativetim">
        <meta name="twitter:image" content="https://s3.amazonaws.com/creativetim_bucket/products/212/original/opt_lbdp_laravel_thumbnail.jpg">


        <!-- Open Graph data -->
        <meta property="fb:app_id" content="655968634437471">
        <meta property="og:title" content="Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-laravel" />
        <meta property="og:image" content="https://s3.amazonaws.com/creativetim_bucket/products/212/original/opt_lbdp_laravel_thumbnail.jpg"/>
        <meta property="og:description" content="Light Bootstrap Dashboard PRO Laravel is a beautiful Bootstrap 4 admin dashboard with a large number of components, designed to look beautiful, clean and organized. If you are looking for a tool to manage dates about your business, this dashboard is the thing for you." />
        <meta property="og:site_name" content="Creative Tim & UPDIVISION" /><meta property="og:url" content="https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-laravel" />
        <meta property="og:image" content="https://s3.amazonaws.com/creativetim_bucket/products/212/original/opt_lbdp_laravel_thumbnail.jpg"/>
        <meta property="og:description" content="Start your development with a premium Bootstrap 4 Admin Dashboard built for Laravel Framework 8.x and Up." />
        <meta property="og:site_name" content="Creative Tim & UPDIVISION" />

        @endif
        <!-- Fonts and Icon-->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

        <!-- CSS file-->
        @stack('css')
        <link type="text/css" href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
        <link type="text/css" href="{{ asset('css/bootstrap-tourist.css') }}" rel="stylesheet">
        <link type="text/css" href="{{ asset('css/light-bootstrap-dashboard.css?v=2.0.1') }}" rel="stylesheet">
        <!-- CSS Just for demo purpose, don't include it in your project -->
        <link href="{{ asset("css/demo.css") }}" rel="stylesheet" />
    </head>
    <body>
      @if (config('app.is_demo'))
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKDMSK6"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
      @endif

        <div class="wrapper @guest wrapper-full-page @endguest">
            @auth
                @include('layouts.navbars.sidebar')
                @include('pages.sidebarstyle')
            @endauth
            <div class="@auth main-panel @endauth">
                @include('layouts.navbars.navbar')
                @yield('content')
                @include('layouts.footer.nav')
            </div>
        </div>
    </body>
        <!--   Core JS Files   -->
    <script src="{{ asset('js/core/jquery.3.2.1.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/core/popper.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/core/bootstrap.min.js') }}" type="text/javascript"></script>
    <!--  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ -->
    <script src="{{ asset('js/plugins/bootstrap-switch.js') }}"></script>
    <!--  Google Maps Plugin    -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?YOUR_KEY_HERE"></script>
    <!--  Chartist Plugin  -->
    <script src="{{ asset('js/plugins/chartist.min.js') }}"></script>
    <!--  Notifications Plugin    -->
    <script src="{{ asset('js/plugins/bootstrap-notify.js') }}"></script>
    <!--  jVector Map  -->
    <script src="{{ asset('js/plugins/jquery-jvectormap.js') }}" type="text/javascript"></script>
    <!--  Share Plugin -->
    <script src="{{ asset('js/plugins/jquery.sharrre.js') }}"></script>
    <!--  Plugin for Date Time Picker and Full Calendar Plugin-->
    <script src="{{ asset('js/plugins/moment.min.js') }}"></script>
    <!--  DatetimePicker   -->
    <script src="{{ asset('js/plugins/bootstrap-datetimepicker.js') }}"></script>
    <!--  Sweet Alert  -->
    <script src="{{asset('js/plugins/sweetalert2.min.js') }}" type="text/javascript"></script>
    <!--  Tags Input  -->
    <script src="{{ asset('js/plugins/bootstrap-tagsinput.js') }}" type="text/javascript"></script>
    <!--  Sliders  -->
    <script src="{{ asset('js/plugins/nouislider.js') }}" type="text/javascript"></script>
    <!--  Bootstrap Select  -->
    <script src="{{ asset('js/plugins/bootstrap-selectpicker.js') }}" type="text/javascript"></script>
    <!--  jQueryValidate  -->
    <script src="{{ asset('js/plugins/jquery.validate.min.js') }}" type="text/javascript"></script>
    <!--  Plugin for the Wizard, full documentation here: https://github.com/VinceG/twitter-bootstrap-wizard -->
    <script src="{{ asset('js/plugins/jquery.bootstrap-wizard.js') }}"></script>
    <!--  Bootstrap Table Plugin -->
    <script src="{{ asset('js/plugins/bootstrap-table.js') }}"></script>
    <!--  DataTable Plugin -->
    <script src="{{ asset('js/plugins/jquery.dataTables.min.js') }}"></script>
    <!--  Full Calendar   -->
    <script src="{{ asset('js/plugins/fullcalendar.min.js') }}"></script>
    <!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="{{ asset('js/light-bootstrap-dashboard.js?v=2.0.1') }}" type="text/javascript"></script>
    <!-- Bootstrap Tourist -->
    <script src="{{ asset('js/plugins/bootstrap-tourist.js') }}"></script>
    <!-- Light Dashboard DEMO methods, don't include it in your project! -->
    <script src="{{ asset('js/demo.js?v=1.0') }}"></script>
    @if(config('app.is_demo'))
        <script src="{{ asset('js/tour.js?v=1.1') }}"></script>
    @endif

    @stack('js')
    <script>
        $(document).ready(function () {
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
            click: function(api, options) {
              api.simulateClick();
              api.openPopup('facebook');
            },
            template: '<i class="fab fa-facebook-f"></i> Facebook',
            url: 'https://light-bootstrap-dashboard-pro-laravel.creative-tim.com/login'
          });
          $('#google').sharrre({
            share: {
              googlePlus: true
            },
            enableCounter: false,
            enableHover: false,
            enableTracking: true,
            click: function(api, options) {
              api.simulateClick();
              api.openPopup('googlePlus');
            },
            template: '<i class="fab fa-google-plus"></i> Google',
            url: 'https://light-bootstrap-dashboard-pro-laravel.creative-tim.com/login'
          });
          $('#twitter').sharrre({
            share: {
              twitter: true
            },
            enableHover: false,
            enableTracking: false,
            enableCounter: false,
            buttons: {
              twitter: {
                via: 'CreativeTim'
              }
            },
            click: function(api, options) {
              api.simulateClick();
              api.openPopup('twitter');
            },
            template: '<i class="fab fa-twitter"></i> Twitter',
            url: 'https://light-bootstrap-dashboard-pro-laravel.creative-tim.com/login'
          });
        });
      </script>
</html>
