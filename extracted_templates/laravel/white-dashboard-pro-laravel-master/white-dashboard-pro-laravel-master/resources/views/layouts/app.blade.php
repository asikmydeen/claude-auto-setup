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
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('white') }}/img/apple-icon.png">
  <link rel="icon" type="image/png" href="{{ asset('white') }}/img/favicon.png">
  <title>
    White Dashboard PRO by Creative Tim & UPDIVISION
  </title>
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet" />
  <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
  <!-- Extra details for Live View on GitHub Pages -->

  @if (config('app.is_demo'))
  <!-- Canonical SEO -->
  <link rel="canonical" href="https://www.creative-tim.com/product/white-dashboard-pro-laravel" />


  <!--  Social tags      -->
  <meta name="keywords" content="design system, dashboard, bootstrap 4 dashboard, bootstrap 4  design, bootstrap 4 system, bootstrap 4, bootstrap 4 uit kit, bootstrap 4 kit, white, white dashboard, creative tim, updivision, html dashboard, html css template, web template, bootstrap, bootstrap 4, css3 template, frontend, responsive bootstrap template, bootstrap dashboard, responsive dashboard, laravel, laravel php, laravel php framework, laravel admin template, laravel admin, laravel admin template + Front End + CRUD, crud laravel php, crud laravel, laravel backend admin dashboard">
  <meta name="description" content="Start your development with a premium Bootstrap 4 Admin Dashboard built for Laravel Framework 8.x and Up.">


  <!-- Schema.org markup for Google+ -->
  <meta itemprop="name" content="White Dashboard PRO Laravel by Creative Tim & UPDIVISION">
  <meta itemprop="description" content="Start your development with a premium Bootstrap 4 Admin Dashboard built for Laravel Framework 8.x and Up.">

  <meta itemprop="image" content="https://s3.amazonaws.com/creativetim_bucket/products/215/original/opt_wd_laravel_thumbnail.jpg?1567087179">


  <!-- Twitter Card data -->
  <meta name="twitter:card" content="product">
  <meta name="twitter:site" content="@creativetim">
  <meta name="twitter:title" content="White Dashboard PRO Laravel by Creative Tim & UPDIVISION">

  <meta name="twitter:description" content="Start your development with a premium Bootstrap 4 Admin Dashboard built for Laravel Framework 8.x and Up.">
  <meta name="twitter:creator" content="@creativetim">
  <meta name="twitter:image" content="https://s3.amazonaws.com/creativetim_bucket/products/215/original/opt_wd_laravel_thumbnail.jpg?1567087179">


  <!-- Open Graph data -->
  <meta property="fb:app_id" content="655968634437471">
  <meta property="og:title" content="White Dashboard PRO Laravel by Creative Tim & UPDIVISION" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://www.creative-tim.com/live/white-dashboard-pro-laravel" />
  <meta property="og:image" content="https://s3.amazonaws.com/creativetim_bucket/products/215/original/opt_wd_laravel_thumbnail.jpg?1567087179"/>
  <meta property="og:description" content="Start your development with a premium Bootstrap 4 Admin Dashboard built for Laravel Framework 8.x and Up." />
  <meta property="og:site_name" content="Creative Tim" />
  @endif


  <!-- Nucleo Icons -->
  <link href="{{ asset('white') }}/css/nucleo-icons.css" rel="stylesheet" />
  <!-- CSS Files -->
  {{-- <link href="{{ asset('white') }}/css/white-dashboard.css?v=1.0.0" rel="stylesheet" /> --}}
   <link href="{{ asset('css') }}/white-dashboard.css?v=1.0.1" rel="stylesheet" />
  <!-- CSS Just for demo purpose, don't include it in your project -->
  <link href="{{ asset('white') }}/demo/demo.css" rel="stylesheet" />
  <link href="{{ asset('white') }}/css/bootstrap-tourist.css" rel="stylesheet" />


</head>
  <body class="white-content {{ $class ?? '' }}">
  @if (config('app.is_demo'))
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKDMSK6"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->
  @endif
      <style>
        #ofBar {
          display:none;
        }
      </style>
        @if (auth()->check() && !in_array(request()->route()->getName(), ['welcome', 'page.pricing', 'page.lock', 'page.error']))
          <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
              @csrf
          </form>
          @include('layouts.page_templates.auth')
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
                      <span class="badge filter badge-primary" data-color="primary"></span>
                      <span class="badge filter badge-info" data-color="blue"></span>
                      <span class="badge filter badge-success" data-color="green"></span>
                      <span class="badge filter badge-warning active" data-color="orange"></span>
                      <span class="badge filter badge-danger" data-color="red"></span>
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
                    <input type="checkbox" name="checkbox" class="bootstrap-switch" data-on-label="" data-off-label="" />
                    <span class="label-switch label-right">ON</span>
                  </div>
                </li>
                <li class="button-container mt-4">
                  <a href="https://white-dashboard-pro-laravel.creative-tim.com/docs/getting-started/laravel-setup.html" target="_blank" class="btn btn-default btn-block btn-round">
                    Documentation
                  </a>
                </li>
                <li class="header-title">Thank you for 95 shares!</li>
                <li class="button-container text-center">
                  <button id="twitter" class="btn btn-round btn-info"><i class="fab fa-twitter"></i> &middot; 45</button>
                  <button id="facebook" class="btn btn-round btn-info"><i class="fab fa-facebook-f"></i> &middot; 50</button>
                  <br>
                  <br>
                  <a class="github-button" href="https://github.com/creativetimofficial/ct-white-dashboard-pro-laravel" data-icon="octicon-star" data-size="large" data-show-count="true" target="_blank" aria-label="Star ntkme/github-buttons on GitHub">Star</a>
                </li>
              </ul>
            </div>
          </div>
        @else
          @include('layouts.page_templates.guest')
        @endif



        <!--   Core JS Files   -->
        <script src="{{ asset('white') }}/js/core/jquery.min.js"></script>

        <!--   Core JS Files   -->
        <script src="{{ asset('white') }}/js/core/jquery.min.js"></script>
        <script src="{{ asset('white') }}/js/core/popper.min.js"></script>
        <script src="{{ asset('white') }}/js/core/bootstrap.min.js"></script>
        <script src="{{ asset('white') }}/js/plugins/perfect-scrollbar.jquery.min.js"></script>
        <script src="{{ asset('white') }}/js/plugins/moment.min.js"></script>
        <!--  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ -->
        <script src="{{ asset('white') }}/js/plugins/bootstrap-switch.js"></script>
        <!--  Plugin for Sweet Alert -->
        <script src="{{ asset('white') }}/js/plugins/sweetalert2.min.js"></script>
        <!--  Plugin for Sorting Tables -->
        <script src="{{ asset('white') }}/js/plugins/jquery.tablesorter.js"></script>
        <!-- Forms Validations Plugin -->
        <script src="{{ asset('white') }}/js/plugins/jquery.validate.min.js"></script>
        <!--  Plugin for the Wizard, full documentation here: https://github.com/VinceG/twitter-bootstrap-wizard -->
        <script src="{{ asset('white') }}/js/plugins/jquery.bootstrap-wizard.js"></script>
        <!--	Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select -->
        <script src="{{ asset('white') }}/js/plugins/bootstrap-selectpicker.js"></script>
        <!--  Plugin for the DateTimePicker, full documentation here: https://eonasdan.github.io/bootstrap-datetimepicker/ -->
        <script src="{{ asset('white') }}/js/plugins/bootstrap-datetimepicker.js"></script>
        <!--  DataTables.net Plugin, full documentation here: https://datatables.net/    -->
        <script src="{{ asset('white') }}/js/plugins/jquery.dataTables.min.js"></script>
        <!--	Plugin for Tags, full documentation here: https://github.com/bootstrap-tagsinput/bootstrap-tagsinputs  -->
        <script src="{{ asset('white') }}/js/plugins/bootstrap-tagsinput.js"></script>
        <!-- Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
        <script src="{{ asset('white') }}/js/plugins/jasny-bootstrap.min.js"></script>
        <!--  Full Calendar Plugin, full documentation here: https://github.com/fullcalendar/fullcalendar    -->
        <script src="{{ asset('white') }}/js/plugins/fullcalendar.min.js"></script>
        <!-- Vector Map plugin, full documentation here: http://jvectormap.com/documentation/ -->
        <script src="{{ asset('white') }}/js/plugins/jquery-jvectormap.js"></script>
        <!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
        <script src="{{ asset('white') }}/js/plugins/nouislider.min.js"></script>
         <!--  Plugin for the Bootstrap Tourist, full documentation here: https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist -->
         <script src="{{ asset('white') }}/js/plugins/bootstrap-tourist.js"></script>
        <!--  Google Maps Plugin    -->
        <!-- Place this tag in your head or just before your close body tag. -->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbVUXb1ZCXDbVu5V-0AjxpikPl6jmgpbQ"></script>
        <!-- Chart JS -->
        <script src="{{ asset('white') }}/js/plugins/chartjs.min.js"></script>
        <!--  Notifications Plugin    -->
        <script src="{{ asset('white') }}/js/plugins/bootstrap-notify.js"></script>
        <!-- Control Center for White Dashboard: parallax effects, scripts for the example pages etc -->
        <script src="{{ asset('white') }}/js/white-dashboard.min.js?v=1.0.0"></script>
        <!-- White Dashboard DEMO methods, don't include it in your project! -->
        <script src="{{ asset('white') }}/demo/demo.js?v=1.0"></script>
        @if (config('app.is_demo'))
            <!-- if the env var is true then show the tour -->
            <script src="{{ asset('white') }}/demo/tour.js?v=1.1"></script>
        @endif
        <script src="{{ asset('white') }}/js/settings.js"></script>
        <script src="{{ asset('white') }}/demo/jquery.sharrre.js"></script>
        <script>
          $(document).ready(function () {
            @if (session('status'))
              $.notify({
                icon: "tim-icons icon-check-2",
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
                icon: "tim-icons icon-check-2",
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
              url: 'https://white-dashboard-pro-laravel.creative-tim.com/login'
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
              url: 'https://white-dashboard-pro-laravel.creative-tim.com/login'
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
              url: 'https://white-dashboard-pro-laravel.creative-tim.com/login'
            });
          });
        </script>
        @stack('js')

</body>

</html>
