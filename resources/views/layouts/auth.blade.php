@extends('layouts.app')

@section('content')
    <div class="reg-popup">
        <div class="reg-popup-body">
            @yield('form')
        </div>
        <div class="reg-body-background"></div>
    </div>
@endsection
