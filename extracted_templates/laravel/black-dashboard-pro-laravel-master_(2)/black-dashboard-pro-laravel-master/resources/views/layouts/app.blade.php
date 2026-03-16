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
  <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('black') }}/img/apple-icon.png">
  <link rel="icon" type="image/png" href="{{ asset('black') }}/img/favicon.png">
  <title>
    Black Dashboard PRO by Creative Tim
  </title>
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" rel="stylesheet" />
  <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">

  @if (config('app.is_demo'))

<!-- Extra details for Live View on GitHub Pages -->
  <!-- Canonical SEO -->
  <link rel="canonical" href="https://www.creative-tim.com/product/black-dashboard-pro-laravel" />


  <!--  Social tags      -->
  <meta name="keywords" content="creative tim, html dashboard, laravel, html css dashboard laravel, web dashboard, bootstrap 4 dashboard laravel, bootstrap 4, css3 dashboard, bootstrap 4 admin laravel, black ui dashboard bootstrap 4 laravel, frontend, responsive bootstrap 4 dashboard, black design, black laravel bootstrap 4 dashboard">
  <meta name="description" content="Download Black Dashboard PRO Laravel, a Premium Frontend Preset for Laravel developed by Creative Tim and UPDIVISION. Over 200 components, see the live demo on our website and join over 700.000 creatives!">


  <!-- Schema.org markup for Google+ -->
  <meta itemprop="name" content="Black Dashboard Pro Laravel by Creative Tim & UPDIVISION">
  <meta itemprop="description" content="Download Black Dashboard PRO Laravel, a Premium Frontend Preset for Laravel developed by Creative Tim and UPDIVISION. Over 200 components, see the live demo on our website and join over 700.000 creatives!">

  <meta itemprop="image" content="https://s3.amazonaws.com/creativetim_bucket/products/158/thumb/opt_mdp_laravel_thumbnail.jpg">


  <!-- Twitter Card data -->
  <meta name="twitter:card" content="product">
  <meta name="twitter:site" content="@creativetim">
  <meta name="twitter:title" content="Black Dashboard Pro Laravel by Creative Tim & UPDIVISIONm">

  <meta name="twitter:description" content="Download Black Dashboard PRO Laravel, a Premium Frontend Preset for Laravel developed by Creative Tim and UPDIVISION. Over 200 components, see the live demo on our website and join over 700.000 creatives!">
  <meta name="twitter:creator" content="@creativetim">
  <meta name="twitter:image" content="https://s3.amazonaws.com/creativetim_bucket/products/158/thumb/opt_mdp_laravel_thumbnail.jpg">


  <!-- Open Graph data -->
  <meta property="fb:app_id" content="655968634437471">
  <meta property="og:title" content="Black Dashboard Pro Laravel by Creative Tim & UPDIVISION" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://black-dashboard-pro-laravel.creative-tim.com/" />
  <meta property="og:image" content="https://s3.amazonaws.com/creativetim_bucket/products/158/thumb/opt_mdp_laravel_thumbnail.jpg"/>
  <meta property="og:description" content="Download Black Dashboard PRO Laravel, a Premium Frontend Preset for Laravel developed by Creative Tim and UPDIVISION. Over 200 components, see the live demo on our website and join over 700.000 creatives!" />
  <meta property="og:site_name" content="Creative Tim" />

  @endif

  <!-- Nucleo Icons -->
  <link href="{{ asset('black') }}/css/nucleo-icons.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link href="{{ asset('css') }}/black-dashboard.css?v=2.0.0" rel="stylesheet" />
  <!-- CSS Just for demo purpose, don't include it in your project -->
  <link href="{{ asset('black') }}/demo/demo.css" rel="stylesheet" />

  <!-- Bootstrap Tourost -->
  <link href="{{ asset('black') }}/demo/bootstrap-tourist.css" rel="stylesheet" />


  </head>
  <body class="{{ $class ?? '' }}">
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
                  <a target="_blank" href="https://black-dashboard-pro-laravel.creative-tim.com/docs/getting-started/laravel-setup.html" class="btn btn-default btn-block btn-round">
                    Documentation
                  </a>
                </li>
                <li class="header-title">Thank you for 95 shares!</li>
                <li class="button-container text-center">
                  <button id="twitter" class="btn btn-round btn-info"><i class="fab fa-twitter"></i> &middot; 45</button>
                  <button id="facebook" class="btn btn-round btn-info"><i class="fab fa-facebook-f"></i> &middot; 50</button>
                  <br>
                  <br>
                  <a class="github-button" target="_blank" href="https://github.com/creativetimofficial/ct-black-dashboard-pro-laravel" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star ntkme/github-buttons on GitHub">Star</a>
                </li>
              </ul>
            </div>
          </div>
        @else
          @include('layouts.page_templates.guest')
        @endif

        <!--   Core JS Files   -->
        <script src="{{ asset('black') }}/js/core/jquery.min.js"></script>
        <script src="{{ asset('black') }}/js/core/popper.min.js"></script>
        <script src="{{ asset('black') }}/js/core/bootstrap.min.js"></script>
        <script src="{{ asset('black') }}/js/plugins/perfect-scrollbar.jquery.min.js"></script>
        <script src="{{ asset('black') }}/js/plugins/moment.min.js"></script>
        <!--  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ -->
        <script src="{{ asset('black') }}/js/plugins/bootstrap-switch.js"></script>
        <!--  Plugin for Sweet Alert -->
        <script src="{{ asset('black') }}/js/plugins/sweetalert2.min.js"></script>
        <!--  Plugin for Sorting Tables -->
        <script src="{{ asset('black') }}/js/plugins/jquery.tablesorter.js"></script>
        <!-- Forms Validations Plugin -->
        <script src="{{ asset('black') }}/js/plugins/jquery.validate.min.js"></script>
        <!--  Plugin for the Wizard, full documentation here: https://github.com/VinceG/twitter-bootstrap-wizard -->
        <script src="{{ asset('black') }}/js/plugins/jquery.bootstrap-wizard.js"></script>
        <!--	Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select -->
        <script src="{{ asset('black') }}/js/plugins/bootstrap-selectpicker.js"></script>
        <!--  Plugin for the DateTimePicker, full documentation here: https://eonasdan.github.io/bootstrap-datetimepicker/ -->
        <script src="{{ asset('black') }}/js/plugins/bootstrap-datetimepicker.js"></script>
        <!--  DataTables.net Plugin, full documentation here: https://datatables.net/    -->
        <script src="{{ asset('black') }}/js/plugins/jquery.dataTables.min.js"></script>
        <!--	Plugin for Tags, full documentation here: https://github.com/bootstrap-tagsinput/bootstrap-tagsinputs  -->
        <script src="{{ asset('black') }}/js/plugins/bootstrap-tagsinput.js"></script>
        <!-- Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
        <script src="{{ asset('black') }}/js/plugins/jasny-bootstrap.min.js"></script>
        <!--  Full Calendar Plugin, full documentation here: https://github.com/fullcalendar/fullcalendar    -->
        <script src="{{ asset('black') }}/js/plugins/fullcalendar.min.js"></script>
        <!-- Vector Map plugin, full documentation here: http://jvectormap.com/documentation/ -->
        <script src="{{ asset('black') }}/js/plugins/jquery-jvectormap.js"></script>
        <!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
        <script src="{{ asset('black') }}/js/plugins/nouislider.min.js"></script>
        <!-- Boostrap tour -->
        <script  src="{{ asset('black') }}/demo/bootstrap-tourist.js"></script>
        <!--  Google Maps Plugin    -->
        <!-- Place this tag in your head or just before your close body tag. -->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbVUXb1ZCXDbVu5V-0AjxpikPl6jmgpbQ"></script>
        <!-- Chart JS -->
        <script src="{{ asset('black') }}/js/plugins/chartjs.min.js"></script>
        <!--  Notifications Plugin    -->
        <script src="{{ asset('black') }}/js/plugins/bootstrap-notify.js"></script>
        <!-- Control Center for Black Dashboard: parallax effects, scripts for the example pages etc -->
        <script src="{{ asset('black') }}/js/black-dashboard.min.js?v=1.0.1"></script>
        <!-- Black Dashboard DEMO methods, don't include it in your project! -->
        <script src="{{ asset('black') }}/demo/demo.js"></script>
        <script src="{{ asset('black') }}/js/settings.js"></script>
        <script src="{{ asset('black') }}/demo/jquery.sharrre.js"></script>
        @if (config('app.is_demo'))
            <script src="{{ asset('black') }}/js/tour.js"></script>
        @endif
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
                type: 'danger',
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
              url: 'https://black-dashboard-pro-laravel.creative-tim.com/login'
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
              url: 'https://black-dashboard-pro-laravel.creative-tim.com/login'
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
              url: 'https://black-dashboard-pro-laravel.creative-tim.com/login'
            });
          });
        </script>
        @stack('js')

</body>

</html>
