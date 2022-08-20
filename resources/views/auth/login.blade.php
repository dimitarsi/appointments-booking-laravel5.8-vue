@extends('layouts.auth')

@section('form')   
    <form method="POST" action="{{ route('login') }}">
        @csrf

        @if($errors->count())
        <div class="row">
            <div class="col">
                @if ($errors->has('email'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
                @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>
        </div>
        @endif

        <div class="row">
            <div class="col">
                <label for="email" class="label">{{ __('E-Mail Address') }}</label>
                <div class="text-input">
                    <input id="email" type="email" class="w-100 form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
                </div>
            </div>
            <div class="col">
                <label for="password" class="label">{{ __('Password') }}</label>
                <label class="text-input">
                    <input id="password" type="password" class="w-100 form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
                </label>

            </div>
        </div>
        <div class="row nowrap">
            <div class="col col-fill-content">
                <button type="submit" class="btn btn-primary d-block">
                    {{ __('Login') }}
                </button>
                <a href="{{ route('register') }}" class="btn btn-link-hallow d-block">{{__('Register')}}</a>
                <a class="btn btn-link-hallow d-block" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label class="label row-center" for="remember">
                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                    {{ __('Remember Me') }}
                </label>
            </div>
        </div>
    </form>
@endsection
