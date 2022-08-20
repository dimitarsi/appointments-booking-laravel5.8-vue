<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="d-flex">
    
    @section('header')
        <div class="header">
            <div class="logo d-flex-col">
                KLENDR
                <span class="d-block">dashboard</span>
            </div>
            @yield('nav')
        </div>
    @endsection

    @section('logout')
        @if(Auth::guard('web')->check())
            <form method="post" action="{{ route('logout') }}" class="logout">
                @csrf
                <button class="btn-submit">
                    <i class="fa fa-close"></i>
                </button>
            </form>
        @endif
    @endsection
    
    @yield('content')
</body>
</html>
