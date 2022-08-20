@extends('layout')

@section('content')
   <div id="app">
       <app />
   </div>
@endsection

@section('footer')
    All right reserved
    <script src="{{asset("js/app.js")}}"></script>
@endsection