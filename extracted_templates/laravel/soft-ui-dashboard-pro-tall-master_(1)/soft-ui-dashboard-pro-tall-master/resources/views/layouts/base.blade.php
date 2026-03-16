<!DOCTYPE html>

@if (Route::currentRouteName()=='rtl')
<html lang="ar" dir="rtl">
@else
<html lang="en">
@endif

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    @if (env('IS_DEMO'))
        <meta name="keywords" content="creative tim, updivision, html dashboard, TALL, Tailwind, Alpine.js, Livewire, html css dashboard PRO TALL, soft ui dashboard PRO TALL, soft ui dashboard PRO TALL, soft ui dashboard, TALL soft ui dashboard, soft ui admin, PRO TALL dashboard, PRO TALL dashboard, TALL admin, web dashboard, dashboard PRO TALL, css3 dashboard, Tailwind admin, soft ui dashboard Tailwind, frontend, responsive Tailwind dashboard, soft ui dashboard, soft ui PRO TALL dashboard" />
        <meta name="description" content="Premium full stack app with hundreds of UI components powered by Tailwind, Alpine.js, Laravel, Livewire" />
        <meta itemprop="name" content=""Soft UI Dashboard PRO TALL Stack by Creative Tim & UPDIVISION" />
        <meta itemprop="description" content="Premium full stack app with hundreds of UI components powered by Tailwind, Alpine.js, Laravel, Livewire" />
        <meta itemprop="image" content="https://s3.amazonaws.com/creativetim_bucket/products/685/original/soft-ui-dashboard-pro-tall.jpg?1664186584" />
        <meta name="twitter:card" content="product" />
        <meta name="twitter:site" content="@creativetim " />
        <meta name="twitter:title" content="Soft UI Dashboard TALL by Creative Tim & UPDIVISION" />
        <meta name="twitter:description" content="Premium full stack app with hundreds of UI components powered by Tailwind, Alpine.js, Laravel, Livewire" />
        <meta name="twitter:creator" content="@creativetim" />
        <meta name="twitter:image" content="https://s3.amazonaws.com/creativetim_bucket/products/685/original/soft-ui-dashboard-pro-tall.jpg?1664186584" />
        <meta property="fb:app_id" content="655968634437471" />
        <meta property="og:title" content="Soft UI Dashboard PRO TALL Stack by Creative Tim & UPDIVISION" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.creative-tim.com/live/soft-ui-dashboard-pro-tall" />
        <meta property="og:image" content="https://s3.amazonaws.com/creativetim_bucket/products/685/original/soft-ui-dashboard-pro-tall.jpg?1664186584" />
        <meta property="og:description" content="Premium full stack app with hundreds of UI components powered by Tailwind, Alpine.js, Laravel, Livewire" />
        <meta property="og:site_name" content="Creative Tim" />
    @endif

    <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('assets') }}/img/apple-icon.png" />
    <link rel="icon" type="image/png" href="{{ asset('assets') }}/img/favicon.png" />
    <title>Soft UI Dashboard PRO TALL Stack by Creative Tim & UPDIVISION</title>
    <!-- Fonts and icons -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link href="{{ asset('assets') }}/css/nucleo-icons.css" rel="stylesheet" />
    <link href="{{ asset('assets') }}/css/nucleo-svg.css" rel="stylesheet" />

    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
    <!-- Popper -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.5/umd/popper.min.js"></script>
    <!-- CSS Files -->
    <link href="{{ asset('assets') }}/css/styles.css" rel="stylesheet" />

    @vite('resources/css/app.css')

    @stack('css')

    @livewireStyles
</head>

<body
    class="m-0 font-sans antialiased font-normal {{ Route::currentRouteName()=='rtl' ? 'text-right' : 'text-left' }} leading-default text-size-base dark:bg-slate-950 bg-gray-50 text-slate-500 dark:text-white">

    {{ $slot }}

    @livewireScripts
</body>

@stack('js')
<script src="{{ asset('assets') }}/js/plugins/perfect-scrollbar.min.js"></script>
<script src="{{ asset('assets') }}/js/soft-ui-dashboard-pro-tailwind.js"></script>

</html>
